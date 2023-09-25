import Button, { BUTTON_COLOR } from '../Button/Button';
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

  const sortOptions = [
    { name: 'по названию', type: 'title' },
    { name: 'по рейтингу', type: 'rating' },
    { name: 'по дате выхода', type: 'year' },
  ]

  const ratingOptions = [
    { name: 'рейтинг от 8', type: 'gt8' },
    { name: 'рейтинг от 7', type: 'gt7' },
    { name: 'рейтинг от 6', type: 'gt6' },
  ]

  return (
    <div className='search-form' onSubmit={handleSubmit} noValidate>
      <form className='search-form__inner'>
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
        <Button className='search-form__button' color={BUTTON_COLOR.gradient} text="Поиск" />
      </form>
      <ul className="search-form__filters">
        {/* <FilterSelect type={FILTER_TYPE.RADIO} filterOptions={sortOptions} /> */}
        <FilterPicker type={FILTER_TYPE.CHECK} title="123" filterOptions={genres.map(({name}) => name)} />
      </ul>
    </div>
  );
};

export default SearchForm;
