import { useState } from "react";
import { fetchMovie } from "../API/TMDB";

const useGetMovies = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMovies = async (name) => {
    try {
      setIsLoading(true);
      setError(null); 
      const movies = await fetchMovie(name);
      setMoviesList(movies);
    } catch (error) {
      setError(error.message); 
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    moviesList,
    getMovies,
  };
};

export default useGetMovies;
