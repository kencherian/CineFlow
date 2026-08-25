import React from 'react';

const Trending = ({ trendingMovies }) => {
  if (!trendingMovies || trendingMovies.length === 0) return null;

  return (
    <section className="trending mt-10 w-full">
      <h2 className="text-2xl font-bold mb-6 text-white">Trending Movies</h2>
      
      {/* Horizontal scroll container with snap scrolling */}
      <ul className="flex flex-row overflow-x-auto gap-6 pb-4 snap-x hide-scrollbar">
        {trendingMovies.map((movie, index) => (
          <li 
            key={movie.$id} 
            className="min-w-[150px] sm:min-w-[200px] snap-start relative rounded-lg overflow-hidden shrink-0 group cursor-pointer"
          >
            {/* Massive ranking number overlay */}
            <p className="absolute bottom-2 left-[-10px] text-7xl font-black text-white/90 drop-shadow-2xl z-10">
              {index + 1}
            </p>
            
            {/* Movie Poster with zoom hover effect */}
            <img 
              src={movie.poster_url} 
              alt={movie.searchTerm} 
              className="w-full h-auto object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Trending;