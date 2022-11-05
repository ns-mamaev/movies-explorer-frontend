import './MoviesCard.css';

const MoviesCard = ({ title, imageSource, buttonType = 'default' }) => {
  return (
    <li className='movies-card'>
      <h3 className='movies-card__title'>{title}</h3>
      <span className='movies-card__duration'>1ч 27м</span>
      <button type='button' className={`movie-card__action-btn movie-card__action-btn_type_${buttonType}`} />
      <img className='movies-card__poster' src={imageSource} alt={title}/>
    </li>
  );
};

export default MoviesCard;
