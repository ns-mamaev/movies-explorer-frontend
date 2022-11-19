import { useState } from 'react';
import { useMemo } from 'react';
import './MoviesCard.css';

const MoviesCard = ({
  movieId,
  title,
  duration,
  imageSource,
  trailerLink,
  onSaveMovie,
  onRemoveMovie,
}) => {

  const [saved, setSaved] = useState(false);

  const normalizedDuration = useMemo(() => {
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }, [duration]);

  const handleSave = (id) => {
    onSaveMovie(id)
      .then(() => setSaved(true));
  }

  const handleRemove = (id) => {
    setSaved(false);
  }

  return (
    <li className='movies-card'>
      <h3 className='movies-card__title'>{title}</h3>
      <span className='movies-card__duration'>{normalizedDuration}</span>
      <button
        type='button'
        onClick={ saved ? () => handleRemove(movieId) : () => handleSave(movieId) }
        className={`movie-card__action-btn movie-card__action-btn_type_${saved ? 'liked' : 'default'}`}
      />
      <a className='movies-card__poster-wrapper' href={trailerLink} target='_blank' rel='noreferrer'>
        <img className='movies-card__poster' src={imageSource} alt={title} />
      </a>
    </li>
  );
};

export default MoviesCard;
