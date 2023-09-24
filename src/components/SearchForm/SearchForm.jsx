import Button from '../Button/Button';
import './SearchForm.css';

function SearchForm({
  onSearch,
  value,
  validationMessage,
  onChange,
  onToggle,
  isToggle,
  onSubmit,
  ...restProps
}) {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className='search-form' onSubmit={handleSubmit} noValidate>
      <div className='search-form__inner'>
        <input
          type='text'
          name='filmSearch'
          placeholder='Фильм или режиссёр'
          className='search-form__input'
          value={value}
          onChange={onChange}
          {...restProps}
        />
        <span className='search-form__error'>{validationMessage}</span>
        <Button className='search-form__button'>
          Поиск
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
