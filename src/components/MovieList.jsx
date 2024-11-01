import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ movies }) => {
  const location = useLocation();

  if (!movies || movies.length === 0) {
    return <p>No movies available</p>;
  }

  return (
    <div>
      <ul className='ul-list-movie'>
        {movies.map((movie) => (
          <li key={movie.id} className="list-of-movies">
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;