import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';

const Movies = ({ movies, onSaveMovie, onRemoveMovie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return (
    <main className='movies'>
      <SearchForm />
      {isLoading ? <Preloader /> : (
        <>
          <MoviesCardList
            movies={movies}
            onSaveMovie={onSaveMovie}
            onRemoveMovie={onRemoveMovie}
          />
          <button type='button' className='movies__load-btn'>Ещё</button>
        </>
      )}
    </main>
  );
};

export default Movies;
