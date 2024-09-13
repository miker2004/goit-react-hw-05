// src/hooks/useGetTrendingMovies.js
import { useState, useCallback } from 'react';
import { fetchTrending } from '../API/TMDB';

const useGetTrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);
  const [errorTrending, setErrorTrending] = useState(null);

  const fetchTrendingMovies = useCallback(async () => {
    try {
      setIsLoadingTrending(true);
      setErrorTrending(null);
      const movies = await fetchTrending();
      setTrendingMovies(movies);
    } catch (error) {
      setErrorTrending(error.message);
    } finally {
      setIsLoadingTrending(false);
    }
  }, []);

  return {
    trendingMovies,
    fetchTrendingMovies,
    isLoadingTrending,
    errorTrending,
  };
};

export default useGetTrendingMovies;
