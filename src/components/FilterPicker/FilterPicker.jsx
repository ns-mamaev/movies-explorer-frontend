import { useEffect, useRef, useState } from "react";
import Button, { BUTTON_COLOR } from "../Button/Button";
import FilterOption from "../FilterOption/FilterOption";
import { cn } from "../../utills/utills";
import xIcon from '../../images/x.svg';
import "./FilterPicker.css";

function FilterPicker(props) {
  const [opened, setOpened] = useState(false);
  const popupRef = useRef();

  const onClikFilter = () => {
    setOpened(!opened);
  };

  useEffect(() => {
    const onClickAround = (e) => {
      console.log('func works')
      if (e.target.closest(".filter-picker") !== popupRef.current) {
        setOpened(false);
        document.body.removeEventListener('click', onClickAround);
      }
    };
    document.body.addEventListener('click', onClickAround);
    return () => document.body.removeEventListener('click', onClickAround);
  }, [opened]);

  return (
    <li className="filter-picker" ref={popupRef}>
      <Button
        type="button"
        className="filter-picker__main-btn"
        onClick={onClikFilter}
      >
        комедия и еще 2
        <img className="filter-picker__main-btn-icon" src={xIcon} />
      </Button>
      <div
        className={cn("filter-picker__popup", {
          "filter-picker__popup_opened": opened,
        })}
      >
        <ul className="filter-picker__options">
          <li>
            <FilterOption
              className="filter-picker__option"
              type="checkbox"
              hideIcon
              value="Вариант1"
            />
          </li>
          <li>
            <FilterOption
              className="filter-picker__option"
              type="checkbox"
              value="Вариант1"
            />
          </li>
          <li>
            <FilterOption
              className="filter-picker__option"
              type="checkbox"
              value="Вариант1"
            />
          </li>
          <li>
            <FilterOption
              className="filter-picker__option"
              type="checkbox"
              value="Вариант1"
            />
          </li>
        </ul>
        <div className="filter-picker__footer">
          <Button text="применить" color={BUTTON_COLOR.secondary} className="filter-picker__submit-btn" />
        </div>
      </div>
    </li>
  );
}

export default FilterPicker;
