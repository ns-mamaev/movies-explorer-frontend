import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({ movies, onRemoveMovie }) => {
  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList
        movies={movies}
        onRemoveMovie={onRemoveMovie}
      />
    </main>
  );
};

export default SavedMovies;
