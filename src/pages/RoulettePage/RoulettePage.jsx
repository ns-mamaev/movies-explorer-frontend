import { useEffect } from "react";
import MoviesCard from "../../components/MoviesCard/MoviesCard";
import HistoryWidget from "../../components/HistoryWidget/HistoryWidget";
import Button, { BUTTON_COLOR } from "../../components/Button/Button";
import { Link } from "react-router-dom";
import MoodSwitcher from "../../components/MoodSwitcher/MoodSwitcher";
import SearchChips from "../../components/SearchChips/SearchChips";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomMovie, fetchRemove, fetchSave } from "../../store/movie/movieSlice";
import { randomMovieSelector } from "../../store/movie/movieSelectors";
import "./RoulettePage.css";

function RoulettePage() {
  const movie = useSelector(randomMovieSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    // выполняется разово при первом входе на страницу
    if (!movie) {
      dispatch(fetchRandomMovie());
    }
  }, [dispatch, movie])

  const onLike = () => {
    if (movie.isLiked) {
      dispatch(fetchRemove(movie._id));
    } else {
      dispatch(fetchSave(movie._id));
    }
  }

  return (
    <main className="random-film-page content-width">
      <div className="random-film">
        {movie ? (
          <MoviesCard onLike={onLike} className="start-page__movie-card" movie={movie} />
        ) : (
          <p style={{ color: "#fff" }}>ЗАГРУЗКА</p>
        )}
        <div className="random-film__form">
          <h1 className="random-film__form-title">Фильм по настроению</h1>
          <div className="random-film__mood-buttons">
            <MoodSwitcher />
          </div>
          <div className="random-film__filters">
            <SearchChips />
          </div>
          <Button
            color={BUTTON_COLOR.gradient}
            text="подобрать фильм"
            className="random-film__search-button"
            onClick={() => dispatch(fetchRandomMovie())}
          />
          <p className="random-film__search_text">
            нужно больше?{" "}
            <Link className="random-film__search_link" to="/movies">
              смотреть все фильмы
            </Link>
          </p>
        </div>
      </div>
      <HistoryWidget />
    </main>
  );
}

export default RoulettePage;
