import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';

const Movies = ({ movies, onSaveMovie, onRemoveMovie, onSearch }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className='movies'>
      <SearchForm
        onSearch={onSearch}
      />
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
