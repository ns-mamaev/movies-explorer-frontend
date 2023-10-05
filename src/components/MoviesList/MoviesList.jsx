import { useCallback } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useDispatch } from "react-redux";
import { fetchRemove, fetchSave } from "../../store/movie/movieSlice";
import "./MoviesList.css";

function MoviesList({ movies }) {
  const dispatch = useDispatch();

  const onLike = useCallback((isLiked, id) => {
    if (isLiked) {
      dispatch(fetchRemove(id));
    } else {
      dispatch(fetchSave(id))
    }
  }, [dispatch]);

  return (
    <ul className="movies-list">
      {movies.map(({ _id, ...restProps }) => (
        <MoviesCard key={_id} onLike={onLike} movie={{ _id, ...restProps }} />
      ))}
    </ul>
  );
}

export default MoviesList;
