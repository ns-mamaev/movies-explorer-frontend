import { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

const SavedMovies = ({ movies, onRemoveMovie, onSearch, inRequest }) => {
  const [value, setValue] = useState('');
  const [shortFilmsToggle, setShortFilmsToggle] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onToggle = () => {
    setShortFilmsToggle(v => !v);
  }

  const hasMovies = movies.length;

  return (
    <main className='saved-movies'>
      <SearchForm
        onSearch={onSearch}
        value={value}
        onChange={onChange}
        onToggle={onToggle}
        isToggle={shortFilmsToggle}
      />
      {inRequest && <Preloader />}
      {!inRequest && hasMovies && (
        <MoviesCardList
          movies={movies}
          onRemoveMovie={onRemoveMovie}
        />
      )}
      {!inRequest && !hasMovies && (
        <div className=''>
          <h2>Пока сохраненных фильмов нет</h2>
          <p>Воспользуйтесь разделом "Фильмы" чтобы искать и добавлять их на эту страницу</p>
        </div>
      )}

    </main>
  );
};

export default SavedMovies;
