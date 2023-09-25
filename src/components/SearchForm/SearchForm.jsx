import Button from '../Button/Button';
import FilterPicker, { FILTER_TYPE } from '../FilterPicker/FilterPicker';
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

  const genres = [
    { "id": "8", "name": "драма" },
    { "id": "6", "name": "комедия" },
    { "id": "22", "name": "биография" },
    { "id": "16", "name": "криминал" },
    { "id": "3", "name": "боевик" },
    { "id": "4", "name": "триллер" },
    { "id": "11", "name": "семейный" },
    { "id": "2", "name": "фантастика" },
    { "id": "10", "name": "приключения" },
    { "id": "14", "name": "мультфильм" },
    { "id": "17", "name": "детектив" },
    { "id": "5", "name": "фэнтези" },
    { "id": "7", "name": "мелодрама" },
    { "id": "23", "name": "история" },
    { "id": "19", "name": "военный" },
    { "id": "13", "name": "вестерн" },
    { "id": "21", "name": "музыка" },
    { "id": "9", "name": "мюзикл" },
    { "id": "24", "name": "спорт" }
  ]

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
        {/* <FilterPicker type={FILTER_TYPE.RADIO} filterOptions={['По рейтингу', 'По названию', 'По дате выхода']} /> */}
        <FilterPicker type={FILTER_TYPE.CHECK} title="123" filterOptions={genres.map(({name}) => name)} />
      </ul>
    </form>
  );
};

export default SearchForm;
