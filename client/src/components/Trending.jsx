import React from 'react';

const Trending = ({ trendingMovies }) => {
  if (!trendingMovies || trendingMovies.length === 0) return null;

  return (
    <section className="trending">
      <h2>Trending Movies</h2>
      <ul>
        {trendingMovies.map((movie, index) => (
          <li key={movie.$id}>
            <p className="rank">{index + 1}</p>
            {/* Assuming your database saves the TMDB poster path */}
            <img 
              src={movie.poster_url} 
              alt={movie.searchTerm} 
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Trending;