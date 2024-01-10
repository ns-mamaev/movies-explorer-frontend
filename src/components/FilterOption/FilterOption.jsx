import "./FilterOption.css";
import { cn } from "../../utills/utills";

function FilterOption(props) {
  const {
    type = "checkbox",
    hideMarker,
    className,
    onChange,
    checked,
    caption,
  } = props;

  return (
    <label className={cn("filter-option", {}, [className])}>
      <input
        type={type}
        className="filter-option__hidden-marker"
        onChange={onChange}
        checked={checked}
      />
      {!hideMarker && (
        <div
          className={cn("filter-option__visible-marker", {
            "filter-option__visible-marker_type_checkbox": type === "checkbox",
            "filter-option__visible-marker_type_radio": type === "radio",
          })}
        />
      )}
      <div className="filter-option__caption">{caption}</div>
    </label>
  );
}

export default FilterOption;
