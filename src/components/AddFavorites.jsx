

import React from "react";

const AddFavorites = ({ movie, handleFavoritesClick }) => {
  return (
    <div className="overlay d-flex align-items-center justify-content-center">
      <button
        type="button"
        className="btn btn-outline-light"
        onClick={() => handleFavoritesClick(movie)}
      >
        Add to Favorites
      </button>
    </div>
  );
};

export default AddFavorites;
