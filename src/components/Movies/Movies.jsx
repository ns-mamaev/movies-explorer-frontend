import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = () => {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList />
      <button type='button' className='movies__load-btn'>Ещё</button>
    </main>
  );
};

export default Movies;
