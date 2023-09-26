import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  setGenres,
  setRating,
  setSortType,
  setYears,
} from "../../store/slices/filterSlice";
import Button from "../Button/Button";
import FilterPicker from "../FilterPicker";
import Search from "../Search/Search";
import "./SearchForm.css";

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
    console.log("submit");
  };

  const genres = [
    { id: "8", name: "драма" },
    { id: "6", name: "комедия" },
    { id: "22", name: "биография" },
    { id: "16", name: "криминал" },
    { id: "3", name: "боевик" },
    { id: "4", name: "триллер" },
    { id: "11", name: "семейный" },
    { id: "2", name: "фантастика" },
    { id: "10", name: "приключения" },
    { id: "14", name: "мультфильм" },
    { id: "17", name: "детектив" },
    { id: "5", name: "фэнтези" },
    { id: "7", name: "мелодрама" },
    { id: "23", name: "история" },
    { id: "19", name: "военный" },
    { id: "13", name: "вестерн" },
    { id: "21", name: "музыка" },
    { id: "9", name: "мюзикл" },
    { id: "24", name: "спорт" },
  ];

  const sortOptions = [
    { name: "по умолчанию", type: "default" },
    { name: "по названию", type: "title" },
    { name: "по рейтингу", type: "rating" },
    { name: "по дате выхода", type: "year" },
  ];

  const ratingOptions = [
    { name: "топ 250", type: "gt6" },
    { name: "рейтинг от 8", type: "gt8" },
    { name: "рейтинг от 7", type: "gt7" },
    { name: "рейтинг от 6", type: "gt6" },
  ];

  const yearOptions = [
    { name: new Date().getFullYear().toString(), type: "6" },
    { name: (new Date().getFullYear() - 1).toString(), type: "5" },
    { name: `2020 - ${new Date().getFullYear() - 2}`, type: "4" },
    { name: "2010 - 2019", type: "3" },
    { name: "2000 - 2009", type: "2" },
    { name: "до 2000", type: "1" },
  ];

  const dispatch = useDispatch();
  const onClearFilters = () => dispatch(resetFilters());
  const filtersActive = useSelector((state) => state.filter.filtersActive)

  return (
    <div className="search-form" onSubmit={handleSubmit} noValidate>
      <Search />
      <ul className="search-form__filters">
        <FilterPicker.Radio
          title="сортировка"
          hideMarker
          hideReset
          storeAction={setSortType}
          optionsSelector={(state) => state.filter.sortType}
          options={sortOptions}
        />
        <FilterPicker.Checkbox
          storeAction={setGenres}
          optionsSelector={(state) => state.filter.genres}
          title="жанры"
          options={genres}
        />
        <FilterPicker.Radio
          title="рейтинг"
          hideMarker
          optionsSelector={(state) => state.filter.rating}
          options={ratingOptions}
          storeAction={setRating}
        />
        <FilterPicker.Checkbox
          title="дата выхода"
          storeAction={setYears}
          optionsSelector={(state) => state.filter.years}
          options={yearOptions}
        />
        {filtersActive && <Button type="button" text="сбросить всё" onClick={onClearFilters} />}
      </ul>
    </div>
  );
}

export default SearchForm;
