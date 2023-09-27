import { useDispatch, useSelector } from "react-redux";
import Button, { BUTTON_COLOR } from "../Button/Button";
import { setFilters } from "../../store/roulette/rouletteSlice";
import xImg from '../../images/x.svg';
import { ROULETTE_FILTERS } from "../../store/roulette/constants";
import { rouletteSelector } from "../../store/roulette/rouletteSelectors";
import "./SearchChips.css";

function SearchChips() {
  const filters = useSelector(rouletteSelector);
  const dispatch = useDispatch();

  const activeChips = Object.values(filters);
  const checkChipsActive = (name) => activeChips.includes(name);

  return (
    <>
      {ROULETTE_FILTERS.map(({ caption, name, type }) => {
        const isActive = checkChipsActive(name);
        return (
          <Button
            color={isActive ? BUTTON_COLOR.primary : BUTTON_COLOR.default}
            key={caption}
            onClick={() => dispatch(setFilters({ type, name }))}
            className="chip"
            type="button"
          >
            {caption}
            {isActive && <img src={xImg} alt={caption} className="chip__x-img" />}
          </Button>
        );
      })}
    </>
  );
}

export default SearchChips;
