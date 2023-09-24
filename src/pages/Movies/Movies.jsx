import { useDispatch, useSelector } from 'react-redux';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import mainApi from '../../utills/MainApi';
import { setMovies } from '../../store/slices/movieSlice';
import './Movies.css';
import SearchForm from '../../components/SearchForm/SearchForm';

function Movies() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    async function getMovies() {
      const page = searchParams.get('page') || 0;
      const limit = searchParams.get('limit') || 8;
      const movies = await mainApi.getMovies({ page, limit });
      dispatch(setMovies(movies.data));
    }
    getMovies();
  }, [])

  const movies = useSelector((state) => state.movies.list);
  return (
    <main className='movies content-width'>
      <SearchForm />
      <MoviesCardList movies={movies}/>
    </main>
  );
}

export default Movies;
