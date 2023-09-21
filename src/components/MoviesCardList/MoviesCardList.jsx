import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({ movies, onSaveMovie, onRemoveMovie }) => {
  const moviesComponents = movies.map(({ _id: id,...restProps }) => (
    <MoviesCard id={id} key={id} {...restProps} />
  ));

  return (
    <ul className='movies-cards'>
      {moviesComponents}
    </ul>
  );
};

export default MoviesCardList;
