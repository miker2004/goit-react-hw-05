import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, NavLink, Outlet, Link } from 'react-router-dom';
import { fetchDetails } from '../API/TMDB';
import '../css/Components.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams(); 
  const location = useLocation(); 
  const [movieDetails, setMovieDetails] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const backLinkLocationRef = useRef(location.state?.from || '/movies'); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const details = await fetchDetails(movieId);
        setMovieDetails(details);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className='back-link-div'>
      <Link to={backLinkLocationRef.current} className="back-link">
        Back to movies
      </Link>
      {movieDetails && (
        <div>
          <h1>{movieDetails.title}</h1>
          <div className='movie-detali-style'>
            <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
            <div className='movie-details-p-container'>
            <p>{movieDetails.overview}</p>
            <p><strong>Rating:</strong> {movieDetails.vote_average}</p> 
            <p><strong>Genres:</strong> {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
            </div>
          </div>
          <nav className='navigation-look'>
            <NavLink to="cast" className="nav-link, cast-rev-style">Cast</NavLink>
            <NavLink to="reviews" className="nav-link, cast-rev-style">Reviews</NavLink>
          </nav>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
