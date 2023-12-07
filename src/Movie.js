import React, { useState } from 'react';
import './Movie.css';

const Movie = ({ movie }) => {
  const [selected, setSelected] = useState(false);
  const plotVisibilityHandler = () => {
    setSelected(!selected);
  }
  return (
    <div className="movie-container">
      <img className="movie-image" src={movie.Poster} alt={movie.Title} />
      <div className="movie-details">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-info">IMDB Rating: {movie.imdbRating}</p>
        <p className="movie-info">Release Date: {movie.Released}</p>
        <p className="movie-info">Genre: {movie.Genre}</p>
        <p className="movie-info">Director: {movie.Director}</p>
        <p className="movie-info">Actors: {movie.Actors}</p>
        <div className="movie-extended-info">
          <p className="movie-info">Runtime: {movie.Runtime}</p>
          <p className="movie-info">Language: {movie.Language}</p>
          <p className="movie-info">Country: {movie.Country}</p>
          <p className="movie-info">Awards: {movie.Awards || 'N/A'}</p>
          <p className="movie-info">Writer: {movie.Writer || 'N/A'}</p>
        </div>
        <button className="movie-button" onClick={plotVisibilityHandler}>
          {selected ? 'Hide Plot' : 'Show Plot'}
        </button>
        {selected && <p className="movie-plot">{movie.Plot}</p>}
      </div>
    </div>
  );
};

export default Movie;
