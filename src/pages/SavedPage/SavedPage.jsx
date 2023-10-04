import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import MoviesCard from "../../components/MoviesCard/MoviesCard";
import { savedMoviesSelector } from "../../store/movie/movieSelector";
import { fetchSavedMovies } from "../../store/movie/movieSlice";
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
            <MoviesCard key={_id} movie={{ _id, ...restProps, isLiked: true }} />
          ))}
        </ul>
    </main>
  )
}

export default SavedPage;
