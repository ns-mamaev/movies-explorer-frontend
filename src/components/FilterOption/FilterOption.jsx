import { useState } from "react";
import "./FilterOption.css";
import { cn } from "../../utills/utills";

function FilterOption(props) {
  const { type = "checkbox", hideMarker, value, className } = props;
  const [checked, setChecked] = useState(false);

  const onToggleCheck = () => setChecked((s) => !s);

  return (
    <label className={cn("filter-option", {}, [className])}>
      <input
        type={type}
        className="filter-option__hidden-marker"
        onClick={onToggleCheck}
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
      <div className="filter-option__caption">{value}</div>
    </label>
  );
}

export default FilterOption;