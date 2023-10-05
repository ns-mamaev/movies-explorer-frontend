import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { savedMoviesSelector } from "../../store/movie/movieSelectors";
import { fetchSavedMovies } from "../../store/movie/movieSlice";
import MoviesList from "../../components/MoviesList/MoviesList";
import { EMPTY_SAVED_PAGE_TEXT } from "../../utills/constants";
import './SavedPage.css'

function SavedPage() {
  const dispatch = useDispatch();
  const movies = useSelector(savedMoviesSelector);

  useEffect(() => {
    dispatch(fetchSavedMovies());
  }, [dispatch]);

  return (
    <main className="saved-page content-width">
        <MoviesList emptyListText={EMPTY_SAVED_PAGE_TEXT} movies={movies} />
    </main>
  )
}

export default SavedPage;
