import { useEffect } from "react";
import MoviesCard from "../../components/MoviesCard/MoviesCard";
import HistoryWidget from "../../components/HistoryWidget/HistoryWidget";
import Button, { BUTTON_COLOR } from "../../components/Button/Button";
import { Link } from "react-router-dom";
import MoodSwitcher from "../../components/MoodSwitcher/MoodSwitcher";
import SearchChips from "../../components/SearchChips/SearchChips";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomMovie, fetchRemove, fetchSave } from "../../store/movie/movieSlice";
import { randomFirstFetchSelector, randomMovieSelector } from "../../store/movie/movieSelectors";
import MovieCardSkeleton from "../../components/MovieCardSkeleton/MovieCardSkeleton";
import { EMPTY_SEARCH_PAGE_TEXT } from "../../utills/constants";
import "./RoulettePage.css";

function RoulettePage() {
  const movie = useSelector(randomMovieSelector);
  const dispatch = useDispatch();
  const isFirstFetch = useSelector(randomFirstFetchSelector);

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

  const skeletonEl = isFirstFetch && <MovieCardSkeleton className="start-page__movie-card" />;
  const movieEl = movie && <MoviesCard isLoading onLike={onLike} className="start-page__movie-card" movie={movie} />;
  const notFoundEl = !(movie || isFirstFetch) && <div className="start-page__not-found start-page__movie-card">{EMPTY_SEARCH_PAGE_TEXT}</div>

  return (
    <main className="random-film-page content-width">
      <div className="random-film">
        {skeletonEl}
        {movieEl}
        {notFoundEl}
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
