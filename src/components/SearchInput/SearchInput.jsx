import { useDispatch } from "react-redux";
import { setSearchValue } from "../../store/filter/filterSlice";
import { useEffect, useRef, useState } from "react";
import useDebouncedFunction from "../../utills/hooks/useDebouncedFunction";
import "./SearchInput.css";

function SearchInput(props) {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const mountRef = useRef(false);

  const debouncedDispatch = useDebouncedFunction(() => {
    dispatch(setSearchValue(value));
  }, 700, true);
  
  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;
      return;
    }
    debouncedDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[value])

  const onReset = () => {
    setValue('');
    dispatch(setSearchValue(''));
  };

  const onChange = (e) => setValue(e.target.value);

  return (
    <div className="search-field">
      <input
        type="text"
        name="filmSearch"
        placeholder="Фильм или режиссёр"
        className="search-field__input"
        value={value}
        onChange={onChange}
        {...props}
      />
      <div className="search-field__outline"></div>
      {value && <button type="button" className="search-field__reset" onClick={onReset}></button>}
    </div>
  );
}

export default SearchInput;
