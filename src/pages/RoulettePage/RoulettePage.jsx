import { useEffect, useState } from "react";
import MoviesCard from "../../components/MoviesCard/MoviesCard";
import mainApi from "../../utills/MainApi";
import HistoryWidget from "../../components/HistoryWidget/HistoryWidget";
import Button, { BUTTON_COLOR } from "../../components/Button/Button";
import { Link } from "react-router-dom";
import MoodSwitcher from "../../components/MoodSwitcher/MoodSwitcher";
import "./RoulettePage.css";

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

  const chips = ['новые', 'высокий рейтинг', 'топ 250', 'ну такое', 'на раз 2 3', 'еще на раз'];

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
          <ul className="random-film__filters">
            {chips.map((text) => (
              <Button key={text} className="random-film__chip" type='button'>
                {text}
              </Button>
            ))}
          </ul>
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
