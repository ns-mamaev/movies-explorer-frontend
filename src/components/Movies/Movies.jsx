import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = () => {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
};

export default Movies;
