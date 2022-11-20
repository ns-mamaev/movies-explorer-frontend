
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

const App = () => {

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const [moviesStore, setMoviesStore] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [findedMovies, setFindedMovies] = useState([]);

  const [inRequest, setInRequest] = useState(false);
  const [serverError, setServerError] = useState('');
  const [moviesLoading, setMoviesLoading] = useState(false);

  const location = useLocation().pathname;
  const navigate = useNavigate();

  const isPageWithHeader = headerPages.includes(location);
  const isPageWithFooter = footerPages.includes(location);

  // ********************* search **************************************************************

  const getBeatfilmMovies = async () => {
    try {
      const movies = await moviesApi.getFilms();
      setMoviesStore(movies)
      return movies;
    } catch (err) {
      console.log(err)
    }
  }

  const showLikedMovies = (arr) => {
    const filmsWithLikes = arr.map(movie => {
      const match = savedMovies.find(({ movieId }) => movieId === movie.movieId);
      return match ? { ...movie, type: 'liked' } : { ...movie, type: 'default' }
    });
    localStorage.setItem('findedMovies', JSON.stringify(filmsWithLikes))
    setFindedMovies(filmsWithLikes);
  }

  useEffect(() => {
    if (savedMovies.length > 0) {
      showLikedMovies(findedMovies);
    }
  }, [savedMovies.length])

  const searchMovies = async (queryText, isShortFilmToggle = false) => {
    localStorage.setItem('queryText', queryText);
    localStorage.setItem('shortFilmsToggle', isShortFilmToggle);
    let movies;
    if (moviesStore.length === 0) {
      movies = await getBeatfilmMovies();
    } else {
      movies = moviesStore;
    }
    const filteredMovies = movies
      .filter(({ nameRU, nameEN, duration }) => {
        const textToMatch = (nameRU + nameEN).toLowerCase();
        const normalizedQuery = queryText.toLowerCase();

        const toggle = isShortFilmToggle ? duration <= 40 : true;
        return toggle && textToMatch.includes(normalizedQuery);
      })
    showLikedMovies(filteredMovies);
    console.log(findedMovies)
  }

  // восстановить данные последнего поиска при монтировании

  useEffect(() => {
    setFindedMovies(JSON.parse(localStorage.getItem('findedMovies')));
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
    } catch (err) {
      console.log(err);
    }
  };

  const saveMovie = async (id) => {
    try {
      const movie = moviesStore.find(item => item.movieId === id);
      const savedMovie = await mainApi.saveMovie(movie);
      setSavedMovies(movies => [...movies, savedMovie])
    } catch (err) {
      throw err;
    }
  };

  const removeMovie = async (id) => {
    try {
      const removedMovie = savedMovies.find(movie => movie.movieId === id)
      await mainApi.removeMovie(removedMovie._id);
      setSavedMovies(movies => [...movies.filter((mov) => mov.movieId !== id)]);
    } catch (err) {
      console.log(err);
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
                movies={savedMovies.map(movie => ({ ...movie, type: 'remove' }))}
                onRemoveMovie={removeMovie}
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
