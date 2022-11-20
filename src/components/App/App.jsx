
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Landing from '../Landing/Landing';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import { headerPages, footerPages } from '../../utills/constants';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utills/MainApi';
import moviesApi from '../../utills/MoviesApi';

function App () {

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const [moviesStore, setMoviesStore] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [findedMovies, setFindedMovies] = useState([]);

  const [inRequest, setInRequest] = useState(false);
  const [serverError, setServerError] = useState('');
  const [moviesLoading, setMoviesLoading] = useState(false);

  const location = useLocation().pathname;
  const navigate = useNavigate();

  const isPageWithHeader = headerPages.includes(location);
  const isPageWithFooter = footerPages.includes(location);


  // получение фильмов с beatfilms
  const getBeatfilmMovies = async () => {
    try {
      const movies = await moviesApi.getFilms();
      setMoviesStore(movies)
      return movies;
    } catch (err) {
      console.log(err)
    }
  }

  // добавление в массив поля с типом фильма (лайкнут или нет)
  const showLikedMovies = (arr) => {
    const filmsWithLikes = arr.map(movie => {
      const match = savedMovies.find(({ movieId }) => movieId === movie.movieId);
      return match ? { ...movie, type: 'liked' } : { ...movie, type: 'default' }
    });
    setFindedMovies(filmsWithLikes);
  }

  // перерисовка карточек при лайке / дизлайке
  useEffect(() => {
    if (savedMovies.length > 0) {
      showLikedMovies(findedMovies);
    }
  }, [savedMovies.length])

  // фильтрация фильмов по строке поиска и чекбоксу
  const filterMovies = (movies, queryText, isShortFilmToggle) => {
    return movies.filter(({ nameRU, nameEN, duration }) => {
      const textToMatch = (nameRU + nameEN).toLowerCase();
      const normalizedQuery = queryText.toLowerCase();

      const toggle = isShortFilmToggle ? duration <= 40 : true;
      return toggle && textToMatch.includes(normalizedQuery);
    })
  };

  // поиск по сохраненным фильмам (предварительно загруженным с mainApi)
  const searchSavedMovies = (queryText, isShortFilmToggle) => {
    const filteredMovies = filterMovies(savedMovies, queryText, isShortFilmToggle);
    setFilteredSavedMovies(filteredMovies);
  }

  // поиск фильмов в данных beatfilms
  const searchMovies = async (queryText, isShortFilmToggle) => {
    localStorage.setItem('queryText', queryText);
    localStorage.setItem('shortFilmsToggle', isShortFilmToggle);
    let movies;
    if (moviesStore.length === 0) {
      movies = await getBeatfilmMovies();
    } else {
      movies = moviesStore;
    }
    const filteredMovies = filterMovies(movies, queryText, isShortFilmToggle);
    showLikedMovies(filteredMovies);
    console.log(filterMovies);
    localStorage.setItem('findedMovies', JSON.stringify(filteredMovies));
  }

  // восстановление данных последнего поиска при монтировании

  useEffect(() => {
    const savedSearch = localStorage.getItem('findedMovies');
    if (savedSearch) {
      const parsedData = JSON.parse(savedSearch);
      setFindedMovies(parsedData);
      setMoviesStore(parsedData);
    }
  }, []);

  // *******************************************************************************************

  const handleRegister = async ({ name, email, password }) => {
    setInRequest(true);
    try {
      await mainApi.register(JSON.stringify({ name, email, password }))
      const user = await mainApi.login(JSON.stringify({ email, password }))
      setLoggedIn(true);
      setCurrentUser(user)
      navigate('/movies');
    } catch (err) {
      setServerError(err.message)
      setTimeout(() => setServerError(''), 3000)
    }
    setInRequest(false);
  }

  const handleLogin = async (userData) => {
    setInRequest(true);
    try {
      const user = await mainApi.login(JSON.stringify(userData))
      setLoggedIn(true);
      setCurrentUser(user);
      navigate('/movies');
    } catch (err) {
      setServerError(err.message)
      //показываю ошибку 3 секунды
      setTimeout(() => setServerError(''), 3000)
    }
    setInRequest(false);
  }

  const getUser = async () => {
    try {
      const user = await mainApi.getOwnProfile()
      if (user.email) {
        setLoggedIn(true);
        setCurrentUser(user);
        navigate('/movies')
      }
    } catch (err) {
      setServerError(err.message);
      setTimeout(() => setServerError(''));
    }
  };

  const handleLogout = async () => {
    try {
      await mainApi.logout();
      setLoggedIn(false);
      setCurrentUser(null)
      navigate('/signin');
    } catch (err) {
      setServerError(err);
      setTimeout(() => setServerError(''), 3000);
    }
  };

  const updateUserInfo = async (userData) => {
    setInRequest(true);
    try {
      const user = await mainApi.updateOwnProfile(JSON.stringify(userData))
      setCurrentUser(user);
    } catch (err) {
      setServerError(err.message)
      //показываю ошибку 3 секунды
      setTimeout(() => setServerError(''), 3000)
    }
    setInRequest(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  // ****************************** MOVIES *******************************************************

  const geSavedMovies = async () => {
    try {
      const savedMovies = await mainApi.getSavedMovies();
      setSavedMovies(savedMovies);
      setFilteredSavedMovies(savedMovies);
    } catch (err) {
    }
  };

  const saveMovie = async (id) => {
    console.log('save')
    try {
      const movie = moviesStore.find(item => item.movieId === id);
      const savedMovie = await mainApi.saveMovie(movie);
      setSavedMovies(movies => [...movies, savedMovie])
      setFilteredSavedMovies(movies => [...movies, savedMovie]);
    } catch (err) {
      throw err;
    }
  };

  const removeMovie = async (id) => {
    console.log('remove')
    try {
      const removedMovie = savedMovies.find(movie => movie.movieId === id)
      await mainApi.removeMovie(removedMovie._id);
      setSavedMovies(movies => [...movies.filter((mov) => mov.movieId !== id)]);
      setFilteredSavedMovies(movies => [...movies.filter((mov) => mov.movieId !== id)])
    } catch (err) {
    }
  }

  useEffect(() => {
    if (loggedIn) {
      geSavedMovies();
    }
  }, [loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isPageWithHeader && <Header />}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route
            path='/signin'
            element={
              <Login
                onSubmit={handleLogin}
                error={serverError}
                inLoading={inRequest}
              />}
          />
          <Route
            path='/signup'
            element={
              <Register
                onSubmit={handleRegister}
                error={serverError}
                inLoading={inRequest}
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                component={Profile}
                onSubmit={updateUserInfo}
                onLogout={handleLogout}
                error={serverError}
                inLoading={inRequest}
              />
            }
          />
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                component={Movies}
                movies={findedMovies}
                onSaveMovie={saveMovie}
                onRemoveMovie={removeMovie}
                onSearch={searchMovies}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                component={SavedMovies}
                movies={filteredSavedMovies.map(movie => ({ ...movie, type: 'remove' }))}
                onRemoveMovie={removeMovie}
                onSearch={searchSavedMovies}
              />
            }
          />
          <Route path='*' element={<ProtectedRoute component={PageNotFound} />} />
        </Routes>
        {isPageWithFooter && <Footer />}
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
