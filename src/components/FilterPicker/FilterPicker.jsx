import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button, { BUTTON_COLOR } from "../Button/Button";
import FilterOption from "../FilterOption/FilterOption";
import { cn } from "../../utills/utills";
import xIcon from "../../images/x.svg";
import vIcon from "../../images/v.svg";
import { setGenres } from "../../store/slices/filterSlice";
import withPopup from "../../hocs/withPopup";
import "./FilterPicker.css";

export const FILTER_TYPE = {
  CHECK: "checkbox",
  RADIO: "radio",
};

const FilterPicker = forwardRef(function FilterPicker(props, ref) {
  const {
    type = FILTER_TYPE.RADIO,
    filterOptions = [],
    isOpen,
    onToggleOpen,
    setIsOpen,
  } = props;

  const dispatch = useDispatch();
  const storedGenres = useSelector((state) => state.filter.genres);
  const [selectedOptions, setSelectedOptions] = useState(storedGenres);

  const onCheckOption = (option) => {
    const isSelected = selectedOptions.includes(option);
    if (!isSelected) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((el) => el !== option));
    }
  };

  const onConfirm = () => {
    setIsOpen(false);
    dispatch(setGenres(selectedOptions));
  };

  const onReset = (e) => {
    e.stopPropagation();
    setSelectedOptions([]);
    setIsOpen(false);
    dispatch(setGenres([]));
  }

  const getCaption = () => {
    const length = storedGenres.length;
    if (!length) {
      return "жанры";
    }
    if (length > 1) {
      return `${storedGenres[0]} и ещё ${length - 1}`;
    }
    return storedGenres[0];
  };
  const caption = getCaption();

  return (
    <li className="filter-picker" ref={ref}>
      <Button
        type="button"
        className="filter-picker__main-btn"
        onClick={onToggleOpen}
        color={storedGenres.length ? BUTTON_COLOR.primary : BUTTON_COLOR.default}
      >
        {caption}
        <img
          className={cn("filter-picker__main-btn-icon", {
            "filter-picker__main-btn-icon_opened": isOpen,
          })}
          src={storedGenres.length ? xIcon : vIcon }
          alt="action-icon"
          onClick={onReset}
        />
      </Button>
      <div
        className={cn("filter-picker__popup", {
          "filter-picker__popup_opened": isOpen,
        })}
      >
        <ul className="filter-picker__options scrollbar-container">
          {filterOptions.map((option) => (
            <li key={option}>
              <FilterOption
                onChange={onCheckOption}
                className="filter-picker__option"
                type={type}
                value={option}
                checked={selectedOptions.includes(option)}
              />
            </li>
          ))}
        </ul>
        {type === FILTER_TYPE.CHECK && (
          <div className="filter-picker__footer">
            <Button
              type="button"
              text="применить"
              color={BUTTON_COLOR.secondary}
              className="filter-picker__submit-btn"
              onClick={onConfirm}
            />
          </div>
        )}
      </div>
    </li>
  );
});

export default withPopup(FilterPicker);
