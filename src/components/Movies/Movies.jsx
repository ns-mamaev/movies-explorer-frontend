import { useDispatch, useSelector } from 'react-redux';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import mainApi from '../../utills/MainApi';
import { setMovies } from '../../store/slices/movieSlice';
import './Movies.css';

function Movies() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    async function getMovies() {
      const page = searchParams.get('page');
      const limit = searchParams.get('limit');
      const movies = await mainApi.getMovies({ page, limit });
      dispatch(setMovies(movies.data));
    }
    getMovies();
  }, [])

  const movies = useSelector((state) => state.movies.list);
  return (
    <main className='movies'>
      <MoviesCardList movies={movies}/>
    </main>
  );
}

export default Movies;
