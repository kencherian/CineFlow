import React, { useState, useEffect } from 'react';

// Sub-component to fetch and render individual posters from TMDB
const TrendingCard = ({ searchData, index }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
        const API_OPTIONS = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
          }
        };
        
        // Use the search term from our database to find the movie on TMDB
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchData.searchTerm)}&page=1`,
          API_OPTIONS
        );
        
        if (!response.ok) throw new Error('Failed to fetch from TMDB');
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          setMovie(data.results[0]);
        }
      } catch (error) {
        console.error("Error fetching trending poster:", error);
      }
    };

    fetchMovieDetails();
  }, [searchData.searchTerm]);

  if (!movie) return null;

  return (
    <li className="min-w-[150px] sm:min-w-[200px] snap-start relative rounded-lg overflow-hidden shrink-0 group cursor-pointer">
      <p className="absolute bottom-2 left-[-10px] text-7xl font-black text-white/90 drop-shadow-2xl z-10">
        {index + 1}
      </p>
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
        className="w-full h-auto object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
      />
    </li>
  );
};

// Main Trending Component
const Trending = ({ trendingMovies }) => {
  if (!trendingMovies || trendingMovies.length === 0) return null;

  return (
    <section className="trending mt-10 w-full">
      <h2 className="text-2xl font-bold mb-6 text-white">Trending Movies</h2>
      
      <ul className="flex flex-row overflow-x-auto gap-6 pb-4 snap-x hide-scrollbar">
        {trendingMovies.map((searchItem, index) => (
          // Swapped $id for _id to fix the React warning
          <TrendingCard key={searchItem._id} searchData={searchItem} index={index} /> 
        ))}
      </ul>
    </section>
  );
};

export default Trending;