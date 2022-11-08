import { useState } from 'react';
import './SearchForm.css';

function SearchForm() {

  const [value, setValue] = useState('');
  const [shortFilmsToggle, setShortFilmsToggle] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setValue('');
    console.log('submit');
  };

  const onToggle = () => {
    setShortFilmsToggle(v => !v)
  };

  return (
    <form className='search-form' onSubmit={onSubmit}>
      <div className='search-form__inner'>
        <input
          type='text'
          name='film-search'
          placeholder='Фильм'
          required
          minLength='3'
          maxLength='300'
          className='search-form__input'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type='submit'
          className='search-form__button'
        >
          Поиск
        </button>
      </div>
      <div className='search-form__toggle'>
        <label className='search-form__toggle-label' htmlFor='short-films'>
          <input
            className='search-form__toggle-checkbox-invisible'
            type='checkbox'
            name='short-films'
            id='short-films'
            checked={shortFilmsToggle}
            onChange={onToggle}
          />
          <span className={`search-form__toggle-checkbox-visible ${shortFilmsToggle && 'search-form__toggle-checkbox-visible_checked' }`} />
          Короткометражки
        </label>
      </div>
    </form>
  );
};

export default SearchForm;
