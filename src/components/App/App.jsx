
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

  const [inRequest, setInRequest] = useState(false);
  const [serverError, setServerError] = useState('');
  const [moviesLoading, setMoviesLoading] = useState(false);

  const location = useLocation().pathname;
  const navigate = useNavigate();

  const isPageWithHeader = headerPages.includes(location);
  const isPageWithFooter = footerPages.includes(location);

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

  const getMovies = async () => {
    try {
      const movies = await moviesApi.getFilms();
      const savedMovies = await mainApi.getSavedMovies();
      setMoviesStore(movies);
      setSavedMovies(savedMovies);
    } catch (err) {
      console.log(err);
    }
  };

  const saveMovie = async (id) => {
    try {
      console.log(id)
      const movie = moviesStore.find(item => item.id === id);
      const savedMovie = await mainApi.saveMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + movie.image.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      });
      setSavedMovies(movies => [...movies, savedMovie])
    } catch(err) {
      throw err;
    }
  };


  const removeMovie = async (id) => {
    try {
      await mainApi.removeMovie(id);
      setSavedMovies(movies => [...movies.filter((mov) => mov._id !== id )]);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      getMovies();
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
                movies={moviesStore}
                onSaveMovie={saveMovie}
                onRemoveMovie={removeMovie}
              />
            }
          />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<ProtectedRoute component={SavedMovies} />} />
          <Route path='*' element={<ProtectedRoute component={PageNotFound} />} />
        </Routes>
        {isPageWithFooter && <Footer />}
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
