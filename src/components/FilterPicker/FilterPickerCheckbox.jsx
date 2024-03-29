import { useEffect, useState } from "react";
import FilterPickerView,{ FILTER_TYPE } from "./view/FilterPickerView";
import { useDispatch, useSelector } from "react-redux";

function FilterPickerCheckbox(props) {
  const {
    title,
    options,
    optionsSelector,
    storeAction
  } = props;
  const dispatch = useDispatch();
  const storedOptions = useSelector(optionsSelector);
  const [selectedOptions, setSelectedOptions] = useState(storedOptions);

  const onCheckOption = (option) => {
    const isSelected = selectedOptions.includes(option);
    if (!isSelected) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((el) => el !== option));
    }
  };

  const onConfirm = () => {
    dispatch(storeAction(selectedOptions));
  };

  const onReset = () => {
    dispatch(storeAction([]));
  }

  const getCaption = () => {
    const length = storedOptions.length;
    if (!length) {
      return title;
    }
    const { name } = options.find(({ type }) => storedOptions[0] === type);
    if (length > 1) {
      return `${name} и ещё ${length - 1}`;
    }
    return name;
  };

  // clear checkboxes when reset store
  useEffect(() => {
    if (storedOptions.length === 0) {
      setSelectedOptions(storedOptions);
    }
  }, [storedOptions])

  return (
    <FilterPickerView
      type={FILTER_TYPE.CHECK}
      buttonCaption={getCaption()}
      onReset={onReset}
      onConfirm={onConfirm}
      filterOptions={options}
      onCheckOption={onCheckOption}
      selectedOptions={selectedOptions}
      hasReset={Boolean(storedOptions.length)}
    />);
}

export default FilterPickerCheckbox;
