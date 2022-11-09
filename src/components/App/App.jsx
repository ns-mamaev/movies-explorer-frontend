
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Landing from '../Landing/Landing';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import { innerPages } from '../../utills/constants';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import './App.css';


const App = () => {
  const location = useLocation().pathname;

  const isInnerPage = innerPages.includes(location);

  return (
    <div className="page">
      {isInnerPage && <Header />}
      <Routes>
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/' element={<Landing />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      {isInnerPage && <Footer />}
    </div>
  );
}

export default App;
