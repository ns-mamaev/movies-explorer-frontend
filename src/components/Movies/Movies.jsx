import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

const Movies = ({ movies, onSaveMovie, onRemoveMovie, onSearch }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [value, setValue] = useState('');
  const [shortFilmsToggle, setShortFilmsToggle] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onToggle = () => {
    setShortFilmsToggle(v => !v);
  }

  useEffect(() => {
    setValue(localStorage.getItem('queryText'));
    // parse - для преобразования строки типа 'false' в Boolean
    setShortFilmsToggle(JSON.parse(localStorage.getItem('shortFilmsToggle')))
  }, []);

  return (
    <main className='movies'>
      <SearchForm
        onSearch={onSearch}
        value={value}
        onChange={onChange}
        onToggle={onToggle}
        isToggle={shortFilmsToggle}
        minLength='3'
        required
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
