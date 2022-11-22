import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';
import { FIND_NOTHING_TEXT, FIRST_SEARCH_TEXT } from '../../utills/constants';

const Movies = ({
  movies,
  onSaveMovie,
  onRemoveMovie,
  onSearch,
  inRequest,
  onLoadMore,
  hasLoadMore,
  onToggle,
  isFirstSearch,
}) => {
  const [value, setValue] = useState(
    localStorage.getItem('queryText') || ''
  );
  const [shortFilmsToggle, setShortFilmsToggle] = useState(
    JSON.parse(localStorage.getItem('shortFilmsToggle')) || false
  );

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const handleToggle = () => {
    setShortFilmsToggle(v => !v);
  }

  // фильтрация фильмов при изменении переключателя
  useEffect(() => {
    localStorage.setItem('shortFilmsToggle', shortFilmsToggle)
    onToggle(value, shortFilmsToggle);
  }, [shortFilmsToggle])

  const hasMovies = movies.length;
  const preloader = inRequest ? <Preloader /> : null;
  const moviesList = !inRequest && hasMovies ? (
    <MoviesCardList
      movies={movies}
      onSaveMovie={onSaveMovie}
      onRemoveMovie={onRemoveMovie}
    />
  ) : null;
  const loadMoreBtn = !inRequest && hasMovies && !hasLoadMore ? (
    <button type='button' onClick={onLoadMore} className='movies__load-btn'>Ещё</button>
  ) : null;
  const message = isFirstSearch ? FIRST_SEARCH_TEXT : FIND_NOTHING_TEXT;
  const infoMessage = !inRequest && !hasMovies ? (
    <p className='movies__info-message'>{message}</p>
  ) : null;

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
      {preloader}
      {moviesList}
      {loadMoreBtn}
      {infoMessage}
    </main>
  );
};

export default Movies;
