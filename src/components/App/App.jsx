
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import './App.css';

const App = () => {
  return (
    <div className="page">
      {/* <Header />
      <main className='main'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
        </Routes>
      </main>
      <Footer /> */}
    </div>
  );
}

export default App;
