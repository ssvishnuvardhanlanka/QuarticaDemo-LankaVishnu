import React, { useState } from 'react';
import Movie from './Movie';
import './App.css';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '8c17184c';

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://www.omdbapi.com/?t=${searchText}&apikey=${API_KEY}`);
      const data = await response.json();
      
      if (data.Response === 'True') {
        setMovieDetails({
          ...data,
          imdbRating: data.imdbRating || 'N/A',
          Released: data.Released || 'N/A',
          Genre: data.Genre || 'N/A',
          Director: data.Director || 'N/A',
          Actors: data.Actors || 'N/A',
          Runtime: data.Runtime || 'N/A',
          Language: data.Language || 'N/A',
          Country: data.Country || 'N/A',
          Awards: data.Awards || 'N/A',
          Writer: data.Writer || 'N/A',
        });
        setError(null);
      } else {
        setMovieDetails(null);
        setError(data.Error || 'Movie not found!');
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setMovieDetails(null);
      setError('An error occurred while fetching movie details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovieDetails();
  };

  return (
    <div className="container">
      <h1>Movie Search App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Enter movie title"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {movieDetails && !error && (
        <Movie movie={movieDetails} selected={true} onClick={() => setMovieDetails(null)} />
      )}
    </div>
  );
};

export default App;
