import Button from '../Button/Button';
import FilterPicker from '../FilterPicker/FilterPicker';
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
      <ul className="search-form__filters">
        <FilterPicker title="123"/>
      </ul>
    </form>
  );
};

export default SearchForm;
