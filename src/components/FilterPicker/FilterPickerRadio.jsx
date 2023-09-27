import { useDispatch, useSelector } from "react-redux";
import FilterPickerView, { FILTER_TYPE } from "./view/FilterPickerView";

function FilterPickerRadio(props) {
  const {
    title,
    options,
    hideMarker,
    optionsSelector,
    storeAction,
    hideReset = false,
  } = props;

  const dispatch = useDispatch();
  const storedOption = useSelector(optionsSelector);

  const onReset = () => {
    dispatch(storeAction(null))
  }

  const getCaption = () => {
    return storedOption ? options.find(({ type }) => type === storedOption).name : title;
  }

  return (
    <FilterPickerView
      hideMarker={hideMarker}
      type={FILTER_TYPE.RADIO}
      buttonCaption={getCaption()}
      onReset={onReset}
      filterOptions={options}
      onCheckOption={(option) => dispatch(storeAction(option))}
      selectedOptions={[storedOption]}
      hasReset={!hideReset && Boolean(storedOption)}
    />);
}

export default FilterPickerRadio;
