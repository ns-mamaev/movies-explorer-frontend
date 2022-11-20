import './SearchForm.css';

function SearchForm({
  onSearch,
  value,
  onChange,
  onToggle,
  isToggle,
  ...restProps
}) {

  const onSubmit = (e) => {
    e.preventDefault();
    onSearch(value, isToggle)
  };

  return (
    <form className='search-form' onSubmit={onSubmit}>
      <div className='search-form__inner'>
        <input
          type='text'
          name='filmSearch'
          placeholder='Фильм'
          className='search-form__input'
          value={value}
          onChange={onChange}
          {...restProps}
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
            checked={isToggle}
            onChange={onToggle}
          />
          <span className={`search-form__toggle-checkbox-visible ${isToggle && 'search-form__toggle-checkbox-visible_checked'}`} />
          Короткометражки
        </label>
      </div>
    </form>
  );
};

export default SearchForm;
