import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToHistory } from "../../store/slices/historySlice";
import './HistoryWidget.css';

function HistoryWidget() {
  const historyList = useSelector((state) => state.history.list);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onMovieClick = (movie) => {
    navigate(`/movies/${movie.id}`);
    dispatch(addToHistory(movie));
  };

  if (!historyList.length) {
    return null;
  }

  return (
    <div className="history-widget">
      <h3 className="history-widget__caption">Вы недавно смотрели</h3>
      <ul className="history-widget__list">
        {historyList.map((movie) => (
          <img className="history-widget__img"
            key={movie.id}
            src={movie.image || movie.thumbnail}
            alt={movie.nameRU}
            onClick={() => onMovieClick(movie)}
          />
        ))}
      </ul>
    </div>
  );
}

export default HistoryWidget;
