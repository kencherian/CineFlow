import React from 'react';

const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language, overview } }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-gray-900">
      
      {/* Poster Image with Zoom Effect */}
      <img
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
        alt={title}
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Dark Gradient Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        
        {/* Metrics Row (Rating, Year, Language) */}
        <div className="flex items-center gap-3 text-sm text-white/80 mb-3">
          <div className="flex items-center gap-1">
            {/* Star SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-bold text-white">{vote_average ? vote_average.toFixed(1) : 'N/A'}</span>
          </div>
          <span>•</span>
          <span>{release_date ? release_date.split('-')[0] : 'N/A'}</span>
          <span>•</span>
          <span className="uppercase">{original_language}</span>
        </div>

        {/* Synopsis (Clamped to 3 lines) */}
        <p className="text-sm text-white/70 line-clamp-3">
          {overview || "No synopsis available for this title."}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;