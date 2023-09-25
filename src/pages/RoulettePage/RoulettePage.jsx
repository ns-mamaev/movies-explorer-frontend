import { useEffect, useState } from "react";
import MoviesCard from "../../components/MoviesCard/MoviesCard";
import mainApi from "../../utills/MainApi";
import HistoryWidget from "../../components/HistoryWidget/HistoryWidget";
import Button, { BUTTON_COLOR } from "../../components/Button/Button";
import { Link } from "react-router-dom";
import MoodSwitcher from "../../components/MoodSwitcher/MoodSwitcher";
import "./RoulettePage.css";
import SearchChips from "../../components/SearchChips/SearchChips";

function RoulettePage() {
  const [movie, setMovie] = useState(null);

  const getMovie = async () => {
    const response = await mainApi.getRandomMovie();
    const { data: movie } = response;
    setMovie({ ...movie, id: movie._id });
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <main className="random-film-page content-width">
      <div className="random-film">
        {movie ? (
          <MoviesCard className="start-page__movie-card" movie={movie} />
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
            onClick={getMovie}
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
