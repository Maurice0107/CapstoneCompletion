import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorites from "./components/AddFavorites";
import router from "../routes/users"
import User from "../../../user-auth/models/User";
import mongoose from "mongoose";
import express from "express";

function App() {
  const API_URL = "http://www.omdbapi.com/?apikey=540a89af";
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieRequest = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const url = `${API_URL}&s=${searchValue}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Network response was not found');
        }
        
        const data = await response.json();
        
        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        setError(error.message);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchValue.trim() !== '') {
      getMovieRequest();
    }
  }, [searchValue]);

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
  };

  return (
    <div className='container-fluid movie_app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      {isLoading ? (
        <div className="text-center">Loading movies...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <div className='row'>
          <MoviesList
            movies={movies}
            handleFavoritesClick={addFavoriteMovie}
            favoriteComponent={AddFavorites}
          />
        </div>
      )}

      <div className='row align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favorites' />
      </div>

      <div className='row'>
        <MoviesList
          movies={favorites}
          handleFavoritesClick={addFavoriteMovie}
          favoriteComponent={AddFavorites}
        />
      </div>
    </div>
  );
}

export default App;
