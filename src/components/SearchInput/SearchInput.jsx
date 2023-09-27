import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../store/filter/filterSlice";
import Button, { BUTTON_COLOR } from "../Button/Button";
import { searchSelector } from "../../store/filter/filterSelectors";
import { useState } from "react";
import "./SearchInput.css";

function SearchInput(props) {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const searchValue = useSelector(searchSelector);
  
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchValue(value))
  };

  const onReset = () => setValue('');

  const onChange = (e) => setValue(e.target.value);

  return (
    <form className="search-field" onSubmit={onSubmit} noValidate>
      <input
        type="text"
        name="filmSearch"
        placeholder="Фильм или режиссёр"
        className="search-field__input"
        value={value}
        onChange={onChange}
        {...props}
      />
      <span className="search-field__error">error message example</span>
      <div className="search-field__buttons">
        {value && <button type="button" className="search-field__reset" onClick={onReset}></button>}
        <Button
          type="submit"
          className="search-field__button"
          color={BUTTON_COLOR.gradient}
          text="Поиск"
        />
      </div>
    </form>
  );
}

export default SearchInput;
