import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import './App.css';

const App = () => {
  return (
    <div className="page">
      <Header />
      {/* <Main /> */}
      <Movies />
      <Footer />
    </div>
  );
}

export default App;
