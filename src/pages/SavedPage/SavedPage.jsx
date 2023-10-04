import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSavedMovies } from "../../store/savedMovies/savedMoviesSlice";
import { savedMoviesSelector } from "../../store/savedMovies/savedMoviesSelectors";
import MoviesCard from "../../components/MoviesCard/MoviesCard";
import './SavedPage.css'

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
        <ul className="movies__list">
          {movies.map(({ _id, movieData: { ...restProps } }) => (
            <MoviesCard key={_id} movie={{ _id, ...restProps }} />
          ))}
        </ul>
    </main>
  )
}

export default SavedPage;
