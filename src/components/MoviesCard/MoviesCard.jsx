import { useMemo } from 'react';
import './MoviesCard.css';

const MoviesCard = ({
    title,
    duration,
    imageSource,
    trailerLink,
    buttonType = 'default'
  }) => {

  const normalizedDuration = useMemo(() => {
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }, [duration]);

  return (
    <li className='movies-card'>
      <h3 className='movies-card__title'>{title}</h3>
      <span className='movies-card__duration'>{normalizedDuration}</span>
      <button type='button' className={`movie-card__action-btn movie-card__action-btn_type_${buttonType}`} />
      <a href={trailerLink} target='_blank' rel='noreferrer'>
        <img className='movies-card__poster' src={imageSource} alt={title}/>
      </a>
    </li>
  );
};

export default MoviesCard;
