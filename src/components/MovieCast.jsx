import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCredits } from '../API/TMDB';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCredits(movieId);
        setCast(data.cast);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (isLoading) return <p>Loading cast...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div>
      <h2>Cast</h2>
      {cast.length === 0 ? <p>No cast information available.</p> : (
        <ul>
          {cast.map(actor => (
            <li key={actor.id}>{actor.name} as {actor.character}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
