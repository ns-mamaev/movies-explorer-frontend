import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cn, getDurationString } from "../../utills/utills";
import { addToHistory } from "../../store/history/historySlice";
import LikeButton from "../LikeButton/LikeButton";
import "./MoviesCard.css";

const MoviesCard = ({ movie, className, onLike }) => {
  const {
    _id: id,
    nameRU,
    nameEN,
    duration,
    year,
    image,
    thumbnail,
    ratingKP,
    isLiked,
  } = movie;

  const descriptionString = `${
    nameEN ? nameEN + ", " : ""
  }${year},&nbsp;${getDurationString(duration)}`;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOpenFilm = () => {
    const historyObject = { id, nameRU, image, thumbnail };
    dispatch(addToHistory(historyObject));
    navigate(`/movies/${id}`);
  };

  return (
    <div className={cn("movies-card", {}, [className])}>
      <div className="movies-card__poster-wrapper" onClick={onOpenFilm}>
        <img className="movies-card__poster" src={image} alt={nameRU} />
        <span className="movies-card__rating">{ratingKP.toFixed(1)}</span>
      </div>
      <div className="movies-card__info-wrapper">
        <div className="movies-card__description">
          <h3 className="movies-card__title">{nameRU}</h3>
          <p className="movies-card__subtitle">
            {descriptionString.replace(/&nbsp;/g, "\u00A0")}
          </p>
        </div>
        <div className="movies-card__btn-wrapper">
          <LikeButton isLiked={isLiked} onClick={() => onLike(isLiked, id)} />
        </div>
      </div>
    </div>
  );
};

export default MoviesCard;
