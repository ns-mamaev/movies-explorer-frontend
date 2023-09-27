import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMovies } from "../../store/movie/movieSlice";
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCard from "../../components/MoviesCard/MoviesCard";
import { filtersSelector, searchSelector } from "../../store/filter/filterSelectors";
import { moviesSelector } from "../../store/movie/movieSelector";
import "./MoviesPage.css";

function MoviesPage() {
  const dispatch = useDispatch();
  const filters = useSelector(filtersSelector);
  const search = useSelector(searchSelector);

  useEffect(() => {
    dispatch(fetchMovies({ ...filters, search }));
  }, [filters, search, dispatch]);

  const movies = useSelector(moviesSelector);

  return (
    <main className="movies content-width">
      <SearchForm />
      <ul className="movies__list">
        {movies.map(({ _id, ...restProps }) => (
          <MoviesCard key={_id} movie={{ _id, ...restProps }} />
        ))}
      </ul>
    </main>
  );
}

export default MoviesPage;
