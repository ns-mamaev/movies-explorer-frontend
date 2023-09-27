import { forwardRef, useCallback } from "react";
import Button, { BUTTON_COLOR } from "../../Button/Button";
import FilterOption from "../../FilterOption/FilterOption";
import { cn } from "../../../utills/utills";
import xIcon from "../../../images/x.svg";
import vIcon from "../../../images/v.svg";
import withPopup from "../../../hocs/withPopup";
import "./FilterPicker.css";

export const FILTER_TYPE = {
  CHECK: "checkbox",
  RADIO: "radio",
};

const FilterPickerView = forwardRef(function FilterPickerView(props, ref) {
  const {
    type = FILTER_TYPE.CHECK,
    buttonCaption,
    hasReset = false,
    selectedOptions,
    onReset,
    onConfirm,
    filterOptions,
    onCheckOption,
    hideMarker = false,
    isOpen,
    setIsOpen,
    onToggleOpen
  } = props;

  const onIconClick = (e) => {
    if (hasReset) {
      e.stopPropagation();
      onReset();
      props.setIsOpen(false);
    }
  }

  const onChange = useCallback((...args) => {
    if (type === FILTER_TYPE.RADIO) {
      setIsOpen(false);
    }
    onCheckOption(...args);
  }, [onCheckOption, type, setIsOpen])

  return (
    <li className="filter-picker" ref={ref}>
      <Button
        type="button"
        className="filter-picker__main-btn"
        onClick={onToggleOpen}
        color={hasReset ? BUTTON_COLOR.primary : BUTTON_COLOR.default}
      >
        {buttonCaption}
        <img
          className={cn("filter-picker__main-btn-icon", {
            "filter-picker__main-btn-icon_opened": isOpen,
          })}
          src={hasReset ? xIcon : vIcon}
          alt="action-icon"
          onClick={onIconClick}
        />
      </Button>
      <div
        className={cn("filter-picker__popup", {
          "filter-picker__popup_opened": isOpen,
        })}
      >
        <ul className="filter-picker__options scrollbar-container">
          {filterOptions.map((option) => (
            <li key={option.type}>
              <FilterOption
                onChange={() => onChange(option.type)}
                className="filter-picker__option"
                caption={option.name}
                type={type}
                hideMarker={hideMarker}
                checked={selectedOptions.includes(option.type)}
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
              onClick={() => {
                setIsOpen(false);
                onConfirm();
              }}
            />
          </div>
        )}
      </div>
    </li>
  );
});

export default withPopup(FilterPickerView);
