import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

const Movies = ({ movies, onSaveMovie, onRemoveMovie, onSearch, inRequest }) => {
  const [value, setValue] = useState('');
  const [shortFilmsToggle, setShortFilmsToggle] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onToggle = () => {
    setShortFilmsToggle(v => !v);
  }

  useEffect(() => {
    const queryText = localStorage.getItem('queryText');
    const toggle = localStorage.getItem('shortFilmsToggle');

    queryText && setValue(queryText);
    // parse - для преобразования строки типа 'false' в Boolean
    toggle && setShortFilmsToggle(JSON.parse(toggle))
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
      {inRequest ? <Preloader /> : (
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
