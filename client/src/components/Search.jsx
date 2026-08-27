import React from 'react';

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="relative flex items-center w-full h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 focus-within:bg-white/20 focus-within:shadow-xl transition-all duration-300 overflow-hidden">
        
        {/* Search Icon */}
        <div className="grid place-items-center h-full w-14 text-white/70">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input Field */}
        <input
          className="peer h-full w-full outline-none text-base text-white bg-transparent placeholder-white/60 pr-4"
          type="text"
          id="search"
          placeholder="Search for thousands of movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;