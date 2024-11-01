import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import MovieList from '../components/MovieList';
import { fetchMovie } from '../API/TMDB';

const MoviePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const fetchMovies = useCallback(
    debounce(async (query) => {
      if (query) {
        setIsLoading(true);
        setError(null);
        try {
          const fetchedMovies = await fetchMovie(query);
          setCurrentMovies(fetchedMovies);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        setCurrentMovies([]);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchMovies(query);
  }, [query, fetchMovies]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.target;
    const newQuery = form.elements.query.value.trim();
    setQuery(newQuery);
    setSearchParams({ query: newQuery });
  };

  return (
    <>
      <h2 className='serach-main-text'> Search For Movie🔍</h2>
      <form onSubmit={handleSearch} className="movie-page-form">
        <input
          className="movie-page-input"
          type="text"
          name="query"
          placeholder="Enter movie name"
        />
        <button className="movie-page-button" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {currentMovies.length > 0 && <MovieList movies={currentMovies} />}
    </>
  );
};

export default MoviePage;