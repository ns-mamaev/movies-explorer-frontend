import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { savedMoviesSelector } from "../../store/movie/movieSelectors";
import { fetchSavedMovies } from "../../store/movie/movieSlice";
import './SavedPage.css'
import MoviesList from "../../components/MoviesList/MoviesList";

function SavedPage() {
  const dispatch = useDispatch();
  const movies = useSelector(savedMoviesSelector);

  useEffect(() => {
    dispatch(fetchSavedMovies());
  }, [dispatch]);

  if (!movies) {
    return <p>Тут ничего нет</p>
  }

  return (
    <main className="saved-page content-width">
        <MoviesList movies={movies} />
    </main>
  )
}

export default SavedPage;
