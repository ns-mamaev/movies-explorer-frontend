import { useEffect, useRef, useState } from "react";
import Button, { BUTTON_COLOR } from "../Button/Button";
import FilterOption from "../FilterOption/FilterOption";
import { cn } from "../../utills/utills";
import xIcon from "../../images/x.svg";
import "./FilterPicker.css";

export const FILTER_TYPE = {
  CHECK: "checkbox",
  RADIO: "radio",
};

function FilterPicker(props) {
  const { type = FILTER_TYPE.RADIO, filterOptions = [] } = props;

  const [opened, setOpened] = useState(false);
  const popupRef = useRef();

  const onClikFilter = () => {
    setOpened(!opened);
  };

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

  return (
    <li className="filter-picker" ref={popupRef}>
      <Button
        type="button"
        className="filter-picker__main-btn"
        onClick={onClikFilter}
      >
        комедия и еще 2
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
            />
          </div>
        )}
      </div>
    </li>
  );
}

export default FilterPicker;
