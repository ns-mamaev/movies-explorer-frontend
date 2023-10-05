import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieData, fetchRemove, fetchSave } from "../../store/movie/movieSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getDurationString } from "../../utills/utills";
import HistoryWidget from "../../components/HistoryWidget/HistoryWidget";
import LikeButton from "../../components/LikeButton/LikeButton";
import "./MoviePage.css";

function MoviePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const movie = useSelector((state) => state.movies.moviePageData);

  useEffect(() => {
    dispatch(fetchMovieData(id));
  }, [dispatch, id]);

  if (!movie) {
    return <p>ЗАГРУЗКА...</p>;
  }

  const {
    image,
    nameRU,
    nameEN,
    year,
    duration,
    description,
    country,
    genres = [],
    director,
    actors = [],
    ratingKP,
    isLiked,
  } = movie;

  const title = `${nameRU} (${year})`;
  const subtitle = nameEN
    ? `${nameEN}, ${getDurationString(duration)}`
    : getDurationString(duration);

  const descriptionItems = [
    ["Страна", country],
    ["Жанр", genres.join(", ")],
    ["Режиссёр", director],
    ["В ролях", actors.join(", ")],
  ];

  const onToggleLike = () => {
    if (isLiked) {
      dispatch(fetchRemove(id));
    } else {
      dispatch(fetchSave(id));
    }
  }

  return (
    <main className="movie-page content-width">
      <button className="movie-page__back-btn" type="button" onClick={() => navigate(-1)}>
        назад
      </button>
      <section className="movie-page__main-content">
        <div className="movie-page__info-wrapper">
          <header className="movie-page__header">
            <div className="movie-page__title-wrapper">
              <h1 className="movie-page__title">{title}</h1>
              <p className="movie-page__subtitle">
                {subtitle.replace(/&nbsp;/g, "\u00A0")}
              </p>
            </div>
            <div className="movie-page__rating-icons">
              <div className="movie-page__rating">{ratingKP.toFixed(1)}</div>
              <div className="movie-page__rating-buttons">
                <LikeButton isLiked={isLiked} onClick={onToggleLike} />
              </div>
            </div>
          </header>
          <article className="movie-page__article">
            <h2 className="movie-page__second-headind">О фильме</h2>
            <p className="movie-page__description">
              {(description + " ").repeat(50).slice(0, 400)}
            </p>
            <div className="movie-page__props">
              {descriptionItems.map(([key, value]) => (
                <Fragment key={key}>
                  <h3 className="movie-page__prop-title">{key}</h3>
                  <p className="movie-page__prop-value">{value}</p>
                </Fragment>
              ))}
            </div>
          </article>
        </div>
        <img className="movie-page__poster" src={image} alt={nameRU} />
      </section>
      <HistoryWidget />
    </main>
  );
}

export default MoviePage;
