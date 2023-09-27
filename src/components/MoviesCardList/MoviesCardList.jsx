import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({ movies }) => {
  const moviesComponents = movies.map(({ _id,...restProps }) => (
    <MoviesCard key={_id} movie={ { _id, ...restProps } } />
  ));

  return (
    <ul className='movies-cards'>
      {moviesComponents}
    </ul>
  );
};

export default MoviesCardList;
