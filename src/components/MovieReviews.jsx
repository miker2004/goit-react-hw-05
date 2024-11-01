import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from '../API/TMDB';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div>
      {reviews.length === 0 ? <p>No reviews available.</p> : (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3 className='review-author'>🕵 {review.author} 🕵</h3>
              <p className='comment-text'>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
