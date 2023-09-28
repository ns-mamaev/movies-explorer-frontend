import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchMoreMovies,
  fetchMovies,
  setOffset,
} from "../../store/movie/movieSlice";
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCard from "../../components/MoviesCard/MoviesCard";
import {
  filtersSelector,
  searchSelector,
} from "../../store/filter/filterSelectors";
import { moviesSelector } from "../../store/movie/movieSelector";
import Button, { BUTTON_COLOR } from "../../components/Button/Button";
import "./MoviesPage.css";

function MoviesPage() {
  const dispatch = useDispatch();
  const filters = useSelector(filtersSelector);
  const search = useSelector(searchSelector);
  const moviesData = useSelector(moviesSelector);
  const { movies, offset, totalCount } = moviesData;

  const getMoreMovies = () => {
    dispatch(fetchMoreMovies({ ...filters, search }));
  };

  useEffect(() => {
    // сброс отступа пагинации при изменении поискового запроса
    if (offset !== 0) {
      dispatch(setOffset(0));
    }
    dispatch(fetchMovies({ ...filters, search }));
  }, [filters, search, dispatch]);

  return (
    <main className="movies content-width">
      <SearchForm />
      {movies.length ? (
        <ul className="movies__list">
          {movies.map(({ _id, ...restProps }) => (
            <MoviesCard key={_id} movie={{ _id, ...restProps }} />
          ))}
        </ul>
      ) : (
        <p className="movies__empty-search">
          По выбранным фильмам ничего не найдено. Можете подождать, пока снимут
          что-то подходящее под ваш запрос или просто отключить часть фильтров
        </p>
      )}
      {totalCount > offset && (
        <Button
          onClick={getMoreMovies}
          className="movies__more-btn"
          color={BUTTON_COLOR.gradient}
          text="загрузить ещё"
        />
      )}
    </main>
  );
}

export default MoviesPage;
