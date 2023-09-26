import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../store/slices/filterSlice";
import Button, { BUTTON_COLOR } from "../Button/Button";
import "./Search.css";

function Search(props) {
  const { ...restProps } = props;
  const dispatch = useDispatch();
  const value = useSelector((state) => state.filter.searchValue);
  const onChange = (e) => dispatch(setSearchValue(e.target.value));
  const onReset = () => dispatch(setSearchValue(''));

  return (
    <form className="search-field">
      <input
        type="text"
        name="filmSearch"
        placeholder="Фильм или режиссёр"
        className="search-field__input"
        value={value}
        onChange={onChange}
        {...restProps}
      />
      <span className="search-field__error">error message example</span>
      <div className="search-field__buttons">
        {value && <button className="search-field__reset" onClick={onReset}></button>}
        <Button
          className="search-field__button"
          color={BUTTON_COLOR.gradient}
          text="Поиск"
        />
      </div>
    </form>
  );
}

export default Search;
