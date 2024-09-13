import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import useGetMovies from './hooks/useGetMovies';
import useGetTrendingMovies from './hooks/useGetTrendingMovies';
import { lazy, Suspense, useEffect } from 'react';

const HomePage = lazy(() => import('./pages/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviePage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
const MovieCast = lazy(() => import('./components/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));

function App() {
  const location = useLocation();
  const { moviesList, getMovies, isLoading, error } = useGetMovies();
  const { trendingMovies, fetchTrendingMovies, isLoadingTrending, errorTrending } = useGetTrendingMovies();

  useEffect(() => {
    if (location.pathname === '/') {
      fetchTrendingMovies();
    }
  }, [location.pathname, fetchTrendingMovies]);

  if (isLoading || isLoadingTrending) return <p>Loading...</p>;
  if (error || errorTrending) return <p className="error-message">Error: {error || errorTrending}</p>;

  return (
    <>
      <Navigation />
      <Suspense fallback={<p>Loading components...</p>}>
        <Routes>
          <Route path="/" element={<HomePage movies={trendingMovies} />} />
          <Route path="/movies" element={<MoviesPage getMovies={getMovies} movies={moviesList} />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
