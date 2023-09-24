import { useEffect, useState } from "react";
import MoviesCard from "../../components/MoviesCard/MoviesCard";
import "./StartPage.css";
import mainApi from "../../utills/MainApi";
import HistoryWidget from "../../components/HistoryWidget/HistoryWidget";
import { cn } from "../../utills/utills";

const MOOD_TYPES = [
  'funny',
  'basic',
  'sad',
  'amazed',
  'tense',
]

function StartPage() {
  const [movie, setMovie] = useState(null);
  const [activeMood, setActiveMood] = useState(MOOD_TYPES[0]);

  const getMovie = async () => {
    const response = await mainApi.getRandomMovie();
    const { data: movie } = response;
    setMovie({ ...movie, id: movie._id });
  };

  useEffect(() => {
    getMovie();
  }, [])

  const onChangeMood = (index) => {
    setActiveMood(MOOD_TYPES[index]);
  }

  const moodButtons = MOOD_TYPES.map((mood, i) => (
    <button
      type="button"
      key={mood}
      className={cn(
        "random-film__mood-button",
        { "random-film__mood-button_active": mood === activeMood },
        [`random-film__mood-button_type_${mood}`]
      )}
      onClick={() => onChangeMood(i)}
    ></button>
  ));

  return (
    <div className="layout">
      <div className="random-film">
        {movie ? (
          <MoviesCard className="start-page__movie-card" movie={movie} />
        ) : (
          <p style={{ color: "#fff" }}>ЗАГРУЗКА</p>
        )}
        <div className="random-film__form">
          <div className="random-film__mood-buttons">
            {moodButtons}
          </div>
          <button className="random-film__search-button" onClick={getMovie}>
            Подобрать фильм!
          </button>
        </div>
      </div>
      <HistoryWidget />
    </div>
  );
}

export default StartPage;
