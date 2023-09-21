import { useState } from "react";
import "./RatingPicker.css";
import { cn } from "../../utills/utills";

function RatingPicker({ userRating }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRating, setCurrentRating] = useState(null);

  const onTogglePopup = () => {
    setIsOpen((state) => !state);
  };

  const onMouseEnter = (e) => setCurrentRating(e.currentTarget.dataset.rating);
  const onMouseLeave = () => setCurrentRating(null);
  const onClickStar = () => {
    setIsOpen(false);
  }

  const starsElements = [...Array(10)].map((_, i) => (
    <button
      className={cn("rating-picker__star", {"rating-picker__star_fill": currentRating >= i + 1})}
      key={i}
      data-rating={i+1}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClickStar}
    ></button>
  ));

  const mainButtonClasses = cn("rating-picker__main-button", {
    "rating-picker__main-button_type_star": !isOpen && !currentRating,
    "rating-picker__main-button_type_close": isOpen && !currentRating,
  });

  return (
    <div className="rating-picker">
      <button className={mainButtonClasses} onClick={onTogglePopup}>
        {isOpen ? currentRating : userRating}
      </button>
      <div
        className={cn("rating-picker__panel", { 'rating-picker__panel_hidden': !isOpen})}
      >{starsElements}</div>
    </div>
  );
}

export default RatingPicker;
