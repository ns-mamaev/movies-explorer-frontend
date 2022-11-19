
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
  const [moviesStore, setMoviesStore] = useState([]);
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

  // фильмы

  const getMovies = async () => {
    setMoviesLoading(true);
    try {
      const movies = await moviesApi.getFilms();
      setMoviesStore(movies);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, [])

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
