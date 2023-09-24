import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cn, getDurationString } from '../../utills/utills';
import RatingPicker from '../RatingPicker/RatingPicker';
import './MoviesCard.css';
import { addToHistory } from '../../store/slices/historySlice';

const MoviesCard = ({ movie, className }) => {
  const {
    id,
    nameRU,
    nameEN,
    duration,
    year,
    image,
    thumbnail,
    ratingKP,
    type = 'default',
  } = movie;
  const descriptionString = `${nameEN ? nameEN + ', ': ''}${year},&nbsp;${getDurationString(duration)}`;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleSave = (id) => {
  //   onSaveMovie(id)
  // }

  // const handleRemove = (id) => {
  //   onRemoveMovie(id)
  // }

  // const onButtonClick = () => {
  //   switch (type) {
  //     case 'liked':
  //     case 'remove':
  //       handleRemove(movieId);
  //       break;
  //     case 'default':
  //       handleSave(movieId);
  //       break;
  //     default:
  //       throw new Error('Тип кнопки не задан')
  //   }
  // }

  const onOpenFilm = () => {
    const historyObject = { id, nameRU, thumbnail };
    dispatch(addToHistory(historyObject));
    navigate(`/movies/${id}`);
  }
  
  return (
    <li className={cn('movies-card', {}, [className])}>
      <div className='movies-card__poster-wrapper' onClick={onOpenFilm}>
        <img className='movies-card__poster' src={image} alt={nameRU} />
        <span className="movies-card__rating">{ratingKP.toFixed(1)}</span>
      </div>
      <div className="movies-card__info-wrapper">
        <div className="movies-card__description">
          <h3 className='movies-card__title'>{nameRU}</h3>
          <p className='movies-card__subtitle'>{descriptionString.replace(/&nbsp;/g, "\u00A0")}</p>
        </div>
        <div className="movies-card__btn-wrapper">
          <RatingPicker />
          <button
            type='button'
            className={`movies-card__action-btn movies-card__action-btn_type_${type}`}
          />
        </div>
      </div>
    </li>
  );
};

export default MoviesCard;
