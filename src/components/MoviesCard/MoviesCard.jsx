import './MoviesCard.css';

const MoviesCard = ({ title }) => {
  return (
    <li className='movies-card'>
      <h3 className='movie-card__title'>{title}</h3>
    </li>
  );
};

export default MoviesCard;
