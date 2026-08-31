import React, { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import Search from './components/Search.jsx';
import MovieCard from './components/MovieCard.jsx';
import Trending from './components/Trending.jsx';
import { updateSearchCount, getTrendingMovies } from './appwrite.js';
import Skeleton from './components/Skeleton.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const GENRES = [
  { id: '', name: 'All' },
  { id: '28', name: 'Action' },
  { id: '35', name: 'Comedy' },
  { id: '27', name: 'Horror' },
  { id: '878', name: 'Sci-Fi' },
  { id: '16', name: 'Animation' }
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]); 
  const [page, setPage] = useState(1);
  
  // State to hold the delayed version of the search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [activeGenre, setActiveGenre] = useState('');
  
  // Update debouncedSearchTerm only after the user stops typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = '', pageNum = 1, genre = '') => {
    // Only set loading to true if it's the first page to avoid flashing the skeletons
    if (pageNum === 1) setIsLoading(true);
    setErrorMessage('');
    
    try {
      const endpoint = query 
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${pageNum}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${pageNum}${genre ? `&with_genres=${genre}` : ''}`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      // If page 1, replace the list. If page 2+, append to the existing list.
      if (pageNum === 1) {
        setMovieList(data.results || []);
      } else {
        setMovieList((prevMovies) => [...prevMovies, ...(data.results || [])]);
      }

      if (query && data.results.length > 0 && pageNum === 1) {
        await updateSearchCount(query, data.results[0]);
      }
      
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(debouncedSearchTerm, nextPage, activeGenre);
  };

  // Trigger the API fetch when the search term OR the active genre changes
  useEffect(() => {
    setPage(1); // Reset to page 1 on new search or filter
    fetchMovies(debouncedSearchTerm, 1, activeGenre);
  }, [debouncedSearchTerm, activeGenre]);

   useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          {/* GENRE FILTERS (Only show if the user isn't actively searching) */}
          {!debouncedSearchTerm && (
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {GENRES.map((genre) => (
                <button
                  key={genre.name}
                  onClick={() => setActiveGenre(genre.id)}
                  className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeGenre === genre.id
                      ? 'bg-white text-black shadow-lg scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* TRENDING SECTION */}
        {trendingMovies.length > 0 && (
          <Trending trendingMovies={trendingMovies} />
        )}

        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          
          {/* Handle Error State */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {/* Grid Layout for Skeletons and Movie Cards */}
          {!errorMessage && (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
              {isLoading ? (
                /* Render 10 skeletons to fill the screen while loading */
                Array.from({ length: 10 }).map((_, index) => (
                  <li key={`skeleton-${index}`}>
                    <Skeleton />
                  </li>
                ))
              ) : (
                /* Render actual movie cards when loading is complete */
                movieList.map((movie) => (
                  <li key={movie.id}>
                    <MovieCard movie={movie} />
                  </li>
                ))
              )}
            </ul>
          )}

          {/* LOAD MORE BUTTON */}
          {!isLoading && !errorMessage && movieList.length > 0 && (
            <div className="flex justify-center mt-10 mb-10">
              <button 
                onClick={handleLoadMore}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-full border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                Load More Movies
              </button>
            </div>
          )}
        </section>
      </div>
      
      {/* Floating Action Button */}
      <ScrollToTop />
    </main>
  );
};

export default App;