import React, { useState } from 'react';
import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>

          {/* Pass the state and the setter function down to the Search component */}
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          
          {/* We will add the API integration, Loading Spinner, and MovieCard mapping here in the next step! */}
          
        </section>
      </div>
    </main>
  );
};

export default App;