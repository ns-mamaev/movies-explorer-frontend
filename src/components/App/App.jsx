
import { useState } from 'react';
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

const App = () => {

  const [currentUser, setCurrentUser] = useState(null);

  const [inRequest, setInRequest] = useState(false);
  const [serverError, setServerError] = useState('');

  const location = useLocation().pathname;
  const navigate = useNavigate();

  const isPageWithHeader = headerPages.includes(location);
  const isPageWithFooter = footerPages.includes(location);

  // // временное решение для эмуляции входа на сайт
  // const handleAuth = () => {
  //   setCurrentUser({ name: 'Виталий', email: 'pochta@yandex.ru' });
  //   navigate('/saved-movies');
  // }
  // // временное решение для эмуляции выхода с сайта
  // const handleLogout = () => {
  //   setCurrentUser(null);
  //   navigate('/');
  // }

  const handleRegister = async (userData) => {
    setInRequest(true);
    try {
      const res = await mainApi.register(JSON.stringify(userData))
      console.log(res)
    } catch(err) {
      setServerError(err.message)
    }
    setInRequest(false);
  }

  const handleLogin = async (userData) => {
    setInRequest(true);
    try {
      const res = await mainApi.login(JSON.stringify(userData))
      console.log(res)
    } catch(err) {
      setServerError(err.message)
    }
    setInRequest(false);
  }


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

          <Route path='/profile' element={<ProtectedRoute component={Profile} />} />
          <Route path='/movies' element={<ProtectedRoute component={Movies} />} />
          <Route path='/saved-movies' element={<ProtectedRoute component={SavedMovies} />} />
          <Route path='*' element={<ProtectedRoute component={PageNotFound} />} />
        </Routes>
        {isPageWithFooter && <Footer />}
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
