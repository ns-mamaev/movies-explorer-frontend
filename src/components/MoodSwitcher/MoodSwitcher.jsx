import { useDispatch, useSelector } from "react-redux";
import { MOOD_TYPES, setMood } from "../../store/slices/rouletteSlice";
import "./MoodSwitcher.css";
import { cn } from "../../utills/utills";

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
