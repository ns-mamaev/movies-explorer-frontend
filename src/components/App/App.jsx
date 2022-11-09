
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import './App.css';

const App = () => {
  return (
    <div className="page">
      {/* <main className='main'> */}
      <Routes>
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/' element={<Main />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      {/* </main> */}

      {/* <Header />
      <Footer /> */}

    </div>
  );
}

export default App;
