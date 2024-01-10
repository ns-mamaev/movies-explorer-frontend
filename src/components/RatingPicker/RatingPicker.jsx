import { forwardRef, useState } from "react";
import { cn } from "../../utills/utills";
import withPopup from "../../hocs/withPopup";
import "./RatingPicker.css";

const RatingPicker = forwardRef(function RatingPicker(props, ref) {
  const { isOpen, onToggleOpen } = props;
  const [currentRating, setCurrentRating] = useState(null);

  const onMouseEnter = (e) => setCurrentRating(e.currentTarget.dataset.rating);
  const onMouseLeave = () => setCurrentRating(null);

  const starsElements = [...Array(10)].map((_, i) => (
    <button
      className={cn("rating-picker__star", {"rating-picker__star_fill": currentRating >= i + 1})}
      key={i}
      data-rating={i+1}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    ></button>
  ));

  const mainButtonClasses = cn("rating-picker__main-button", {
    "rating-picker__main-button_type_star": !isOpen && !currentRating,
    "rating-picker__main-button_type_close": isOpen && !currentRating,
  });

  return (
    <div className="rating-picker" ref={ref}>
      <button className={mainButtonClasses} onClick={onToggleOpen}>
        {isOpen ? currentRating : null}
      </button>
      <div
        className={cn("rating-picker__panel", { 'rating-picker__panel_hidden': !isOpen})}
      >{starsElements}</div>
    </div>
  );
});

export default withPopup(RatingPicker);
