

import React from "react";
import MovieCard from "./MovieCard"; 

const MoviesList = ({ movies, handleFavoritesClick, favoriteComponent }) => {
  return (
    <>
      {movies.map((movie, index) => (
        <div key={index} className="image-container d-flex justify-content-start m-3">
          <MovieCard key={movie.imdbID} movie={movie} />
          <favoriteComponent movie={movie} handleFavoritesClick={handleFavoritesClick} />
        </div>
      ))}
    </>
  );
};

export default MoviesList;
