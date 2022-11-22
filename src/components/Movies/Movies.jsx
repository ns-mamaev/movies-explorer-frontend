import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

const Movies = ({
  movies,
  onSaveMovie,
  onRemoveMovie,
  onSearch,
  inRequest,
  onLoadMore,
  hasLoadMore,
  onToggle,
}) => {
  const [value, setValue] = useState('');
  const [shortFilmsToggle, setShortFilmsToggle] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const handleToggle = () => {
    setShortFilmsToggle(v => !v);
  }

  // фильтрация фильмов при изменении переключателя
  useEffect(() => {
    onToggle(value, shortFilmsToggle);
  }, [shortFilmsToggle])

  // загрузка состояния формы из localStorage
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
        onToggle={handleToggle}
        isToggle={shortFilmsToggle}
        minLength='2'
        required
      />
      {inRequest ? <Preloader /> : (
        <>
          <MoviesCardList
            movies={movies}
            onSaveMovie={onSaveMovie}
            onRemoveMovie={onRemoveMovie}
          />
          {
            !hasLoadMore && (
              <button type='button' onClick={onLoadMore} className='movies__load-btn'>
                Ещё
              </button>
            )
          }
        </>
      )}
    </main>
  );
};

export default Movies;
