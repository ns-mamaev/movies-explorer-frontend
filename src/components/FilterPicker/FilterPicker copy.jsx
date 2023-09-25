import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Button, { BUTTON_COLOR } from "../Button/Button";
import FilterOption from "../FilterOption/FilterOption";
import { cn } from "../../utills/utills";
import xIcon from "../../images/x.svg";
import "./FilterPicker.css";
import { setGenres } from "../../store/slices/filterSlice";

export const FILTER_TYPE = {
  CHECK: "checkbox",
  RADIO: "radio",
};

function FilterPicker(props) {
  const { type = FILTER_TYPE.RADIO, filterOptions = [] } = props;
  const dispatch = useDispatch();
  const storedGenres = useSelector((state) => state.filter.genres);

  const [opened, setOpened] = useState(false); // в HOC
  const popupRef = useRef(); // в HOC

  const onClikFilter = () => {
    setOpened(!opened);
  };

  const [selectedOptions, setSelectedOptions] = useState([]);

  const onCheckOption = (option, wasChecked) => {
    if (wasChecked) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((optionInState) => optionInState !== option));
    }
  }

  const onConfirm = () => {
    setOpened(false)
    dispatch(setGenres(selectedOptions))
  }

  // нужно сделать HOC для элементов - попапов
  useEffect(() => {
    const onClickAround = (e) => {
      console.log("func works");
      if (e.target.closest(".filter-picker") !== popupRef.current) {
        setOpened(false);
        document.body.removeEventListener("click", onClickAround);
      }
    };
    document.body.addEventListener("click", onClickAround);
    return () => document.body.removeEventListener("click", onClickAround);
  }, [opened]);
  // убрать код выше

  const getCaption = () => {
    const length = storedGenres.length;
    if (!length) {
      return 'жанры'
    }
    if (length > 1) {
      return `${storedGenres[0]} и ещё ${length - 1}`;
    }
    return storedGenres[0];
  }
  const caption = getCaption();

  return (
    <li className="filter-picker" ref={popupRef}>
      <Button
        type="button"
        className="filter-picker__main-btn"
        onClick={onClikFilter}
      >
        {caption}
        <img
          className="filter-picker__main-btn-icon"
          src={xIcon}
          alt="action-icon"
        />
      </Button>
      <div
        className={cn("filter-picker__popup", {
          "filter-picker__popup_opened": opened,
        })}
      >
        <ul className="filter-picker__options scrollbar-container">
          {filterOptions.map((option) => (
            <li key={option}>
              <FilterOption
                onClick={onCheckOption}
                className="filter-picker__option"
                type={type}
                value={option}
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
}

export default FilterPicker;
