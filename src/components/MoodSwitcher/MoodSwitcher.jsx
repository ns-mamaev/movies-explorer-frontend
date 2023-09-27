import { useDispatch, useSelector } from "react-redux";
import { setMood } from "../../store/roulette/rouletteSlice";
import { cn } from "../../utills/utills";
import { MOOD_TYPES } from "../../store/roulette/constants";
import "./MoodSwitcher.css";

function MoodSwitcher() {
  const dispatch = useDispatch();
  const activeMood = useSelector((state) => state.roulette.mood);

  return (
    <>
      {MOOD_TYPES.map((mood) => (
        <button
          type="button"
          key={mood}
          className={cn(
            "mood-button",
            { "mood-button_active": mood === activeMood },
            [`mood-button_type_${mood}`]
          )}
          onClick={() => dispatch(setMood(mood))}
        ></button>
      ))}
    </>
  );
}

export default MoodSwitcher;
