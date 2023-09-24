import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToHistory } from "../../store/slices/historySlice";

function HistoryWidget() {
  const historyList = useSelector((state) => state.history.list);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onMovieClick = (movie) => {
    navigate(`/movies/${movie.id}`);
    dispatch(addToHistory(movie));
  };

  return (
    <div className="history-widget">
      <h3 className="history-widget__caption">Вы недавно смотрели</h3>
      <ul className="history-widget__list">
        {historyList.map((movie) => (
          <img
            src={movie.thumbnail}
            alt={movie.nameRU}
            onClick={() => onMovieClick(movie)}
          />
        ))}
      </ul>
    </div>
  );
}

export default HistoryWidget;
