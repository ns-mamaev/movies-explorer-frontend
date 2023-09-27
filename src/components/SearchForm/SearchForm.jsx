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
import Search from "../SearchInput/SearchInput";
import "./SearchForm.css";
import { filtersActiveSelector, genresSelector, ratingSelector, sortTypeSelector, yearsSelector } from "../../store/filter/filterSelectors";
import { GENRES_OPTIONS, RAITING_OPTIONS, SORT_OPTIONS, YEAR_OPTIONS } from "../../store/filter/contants";

function SearchForm() {
  const dispatch = useDispatch();
  const onClearFilters = () => dispatch(resetFilters());
  const filtersActive = useSelector(filtersActiveSelector);

  return (
    <div className="search-form">
      <Search />
      <ul className="search-form__filters">
        <FilterPicker.Radio
          title="сортировка"
          hideMarker
          hideReset
          storeAction={setSortType}
          optionsSelector={sortTypeSelector}
          options={SORT_OPTIONS}
        />
        <FilterPicker.Checkbox
          storeAction={setGenres}
          optionsSelector={genresSelector}
          title="жанры"
          options={GENRES_OPTIONS}
        />
        <FilterPicker.Radio
          title="рейтинг"
          hideMarker
          optionsSelector={ratingSelector}
          options={RAITING_OPTIONS}
          storeAction={setRating}
        />
        <FilterPicker.Checkbox
          title="дата выхода"
          storeAction={setYears}
          optionsSelector={yearsSelector}
          options={YEAR_OPTIONS}
        />
        {filtersActive && <Button type="button" text="сбросить всё" onClick={onClearFilters} />}
      </ul>
    </div>
  );
}

export default SearchForm;
