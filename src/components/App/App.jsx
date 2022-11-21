import { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Landing from '../Landing/Landing';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import { headerPages, footerPages, DESKTOP_CARDS_QTY, TABLET_CARDS_QTY, MOBILE_CARDS_QTY } from '../../utills/constants';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utills/MainApi';
import moviesApi from '../../utills/MoviesApi';
import Preloader from '../Preloader/Preloader';
import { debounce } from '../../utills/utills';
import './App.css';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // стейт для скрытия прелоадером процесса аутентификации
  const [appLoading, setAppLoading] = useState(true);

  // общий список фильмов от beatFilms
  const [moviesStore, setMoviesStore] = useState([]);
  // отфильтрованный список beatFilms
  const [findedMovies, setFindedMovies] = useState([]);
  // обрезанный отфильтрованный список beatFilms
  const [shownFindedMovies, setShownFindedMovies] = useState([]);

  // сохраненные фильмы с mainApi
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  const [inRequest, setInRequest] = useState(false);
  const [serverError, setServerError] = useState('');

  const location = useLocation().pathname;
  const navigate = useNavigate();

  const isPageWithHeader = headerPages.includes(location);
  const isPageWithFooter = footerPages.includes(location);

  const [cardsQty, setCardsQty] = useState({});

  // расчет кол-ва отображаемых и подгружаемых карточек на основании ширины страницы
  const calculateCardsQty = () => {
    const pageWidth = document.documentElement.clientWidth;
    if (pageWidth > 1180) {
      setCardsQty(DESKTOP_CARDS_QTY);
      return
    }
    if (pageWidth > 720) {
      setCardsQty(TABLET_CARDS_QTY);
      return
    }
    setCardsQty(MOBILE_CARDS_QTY);
  };

  // то же, с отложенным исполнением
  const debouncedCalculateQty = debounce(calculateCardsQty, 200);

  // расчет кол-ва карточек при монтировании и каждом resize
  useEffect(() => {
    calculateCardsQty();
    window.addEventListener('resize', debouncedCalculateQty);
    return () => window.removeEventListener('resize', debouncedCalculateQty);
  }, []);

  // получение фильмов с beatfilms
  const getBeatfilmMovies = async () => {
    setInRequest(true)
    try {
      const movies = await moviesApi.getFilms();
      setMoviesStore(movies)
      setInRequest(false);
      return movies;
    } catch (err) {
      console.log(err)
      setInRequest(false);
    }
  }

  // добавление в массив поля с типом фильма (лайкнут или нет)
  const showLikedMovies = (arr) => {
    return arr.map(movie => {
      const match = savedMovies.find(({ movieId }) => movieId === movie.movieId);
      return match ? { ...movie, type: 'liked' } : { ...movie, type: 'default' }
    });
  }

  // перерисовка карточек при лайке / дизлайке !! ненадежная проверка на кол-во, может не перерисовываться
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
    setFindedMovies(filteredMovies);
    localStorage.setItem('findedMovies', JSON.stringify(filteredMovies));
  }

  // восстановление данных последнего поиска при монтировании

  useEffect(() => {
    const savedSearch = localStorage.getItem('findedMovies');
    if (savedSearch) {
      const parsedData = JSON.parse(savedSearch);
      setFindedMovies(parsedData);
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

  // аутентификация при монтировании приложения
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
    setAppLoading(false);
  };

  // выход из профиля
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

  // обновление профиля
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

  // аутентификация при монтировании приложения
  useEffect(() => {
    getUser();
  }, []);

  // ****************************** MOVIES *******************************************************

  // получение фильмов пользователя с mainApi
  const geSavedMovies = async () => {
    try {
      const savedMovies = await mainApi.getSavedMovies();
      setSavedMovies(savedMovies);
      setFilteredSavedMovies(savedMovies);
    } catch (err) {
      console.log(err);
    }
  };

  // сохранение фильма на mainApi
  const saveMovie = async (id) => {
    console.log('save')
    console.log(savedMovies, id)
    try {
      const movie = findedMovies.find(item => item.movieId === id);
      const savedMovie = await mainApi.saveMovie(movie);
      setSavedMovies(movies => [...movies, savedMovie])
      setFilteredSavedMovies(movies => [...movies, savedMovie]);
    } catch (err) {
      throw err;
    }
  };

  // удаление фильма с mainApi
  const removeMovie = async (id) => {
    console.log('remove')
    console.log(savedMovies)
    try {
      const removedMovie = savedMovies.find(movie => movie.movieId === id)
      await mainApi.removeMovie(removedMovie._id);
      setSavedMovies(movies => [...movies.filter((mov) => mov.movieId !== id)]);
      setFilteredSavedMovies(movies => [...movies.filter((mov) => mov.movieId !== id)])
    } catch (err) {
    }
  }

  // получение фильмов пользователя при монтировании
  useEffect(() => {
    if (loggedIn) {
      geSavedMovies();
    }
  }, [loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {appLoading ? <Preloader /> : (
          <>
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
                    movies={showLikedMovies(shownFindedMovies)}
                    onSaveMovie={saveMovie}
                    onRemoveMovie={removeMovie}
                    onSearch={searchMovies}
                    inRequest={inRequest}
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
                    inRequest={inRequest}
                  />
                }
              />
              <Route path='*' element={<ProtectedRoute component={PageNotFound} />} />
            </Routes>
            {isPageWithFooter && <Footer />}
          </>
        )}
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
