import './MoviesCard.css';
import { Link } from 'react-router-dom';
import { getDurationString } from '../../utills/utills';
import RatingPicker from '../RatingPicker/RatingPicker';

const MoviesCard = ({
  id,
  nameRU,
  nameEN,
  duration,
  year,
  image,
  type = 'default',
}) => {

  const descriptionString = `${nameEN ? nameEN + ', ': ''}${year},&nbsp;${getDurationString(duration)}`;

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

  return (
    <li className='movies-card'>
      <Link className='movies-card__poster-wrapper' to={`/movies/${id}`}>
        <img className='movies-card__poster' src={image} alt={nameRU} />
        <span className="movies-card__rating">6.8</span>
      </Link>
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
