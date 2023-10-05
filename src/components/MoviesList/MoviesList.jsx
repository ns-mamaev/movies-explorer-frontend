import { useCallback } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useDispatch } from "react-redux";
import { fetchRemove, fetchSave } from "../../store/movie/movieSlice";
import emptyListPic from "../../images/cat.svg";
import Preloader from "../Preloader/Preloader";
import "./MoviesList.css";

function MoviesList({ movies, emptyListText }) {
  const dispatch = useDispatch();

  const onLike = useCallback(
    (isLiked, id) => {
      if (isLiked) {
        dispatch(fetchRemove(id));
      } else {
        dispatch(fetchSave(id));
      }
    },
    [dispatch]
  );

  if (!movies) {
    return <Preloader />
  }

  if (!movies.length) {
    return (
      <div className="list-empty">
        <img className="list-empty__pic" src={emptyListPic} alt="список пуст" />
        <p className="list-empty__caption">{emptyListText}</p>
      </div>
    );
  }

  return (
    <ul className="movies-list">
      {movies.map(({ _id, ...restProps }) => (
        <MoviesCard key={_id} onLike={onLike} movie={{ _id, ...restProps }} />
      ))}
    </ul>
  );
}

export default MoviesList;
