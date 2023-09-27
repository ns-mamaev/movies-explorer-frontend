import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  setGenres,
  setRating,
  setSortType,
  setYears,
} from "../../store/filter/filterSlice";
import Button from "../Button/Button";
import FilterPicker from "../FilterPicker";
import Search from "../Search/Search";
import "./SearchForm.css";
import { genresSelector, ratingSelector, sortTypeSelector, yearsSelector } from "../../store/filter/filterSelectors";

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
    { type: "8", name: "драма" },
    { type: "6", name: "комедия" },
    { type: "22", name: "биография" },
    { type: "16", name: "криминал" },
    { type: "3", name: "боевик" },
    { type: "4", name: "триллер" },
    { type: "11", name: "семейный" },
    { type: "2", name: "фантастика" },
    { type: "10", name: "приключения" },
    { type: "14", name: "мультфильм" },
    { type: "17", name: "детектив" },
    { type: "5", name: "фэнтези" },
    { type: "7", name: "мелодрама" },
    { type: "23", name: "история" },
    { type: "19", name: "военный" },
    { type: "13", name: "вестерн" },
    { type: "21", name: "музыка" },
    { type: "9", name: "мюзикл" },
    { type: "24", name: "спорт" },
  ];

  const sortOptions = [
    { name: "по умолчанию", type: "default" },
    { name: "по названию", type: "title" },
    { name: "по рейтингу", type: "rating" },
    { name: "по дате выхода", type: "year" },
  ];

  const ratingOptions = [
    { name: "топ 250", type: "top250" },
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
          optionsSelector={sortTypeSelector}
          options={sortOptions}
        />
        <FilterPicker.Checkbox
          storeAction={setGenres}
          optionsSelector={genresSelector}
          title="жанры"
          options={genres}
        />
        <FilterPicker.Radio
          title="рейтинг"
          hideMarker
          optionsSelector={ratingSelector}
          options={ratingOptions}
          storeAction={setRating}
        />
        <FilterPicker.Checkbox
          title="дата выхода"
          storeAction={setYears}
          optionsSelector={yearsSelector}
          options={yearOptions}
        />
        {filtersActive && <Button type="button" text="сбросить всё" onClick={onClearFilters} />}
      </ul>
    </div>
  );
}

export default SearchForm;
