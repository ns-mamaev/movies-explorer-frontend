import { Route, Routes } from "react-router-dom";
import Movies from "../../pages/Movies/Movies";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import MoviePage from "../../pages/MoviePage/MoviePage";
import RoulettePage from "../../pages/RoulettePage/RoulettePage";
import "./App.css";

function App() {
  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/" element={<RoulettePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
