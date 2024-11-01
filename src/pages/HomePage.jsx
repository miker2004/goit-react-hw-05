import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import { fetchTrending } from '../API/TMDB';

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await fetchTrending();
        setPopularMovies(movies);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div>
          <h1 className='main-text-on-mane-page' >See What's Trending</h1>
      {popularMovies.length > 0 && <MovieList movies={popularMovies} />}
    </div>
  );
};

export default HomePage;