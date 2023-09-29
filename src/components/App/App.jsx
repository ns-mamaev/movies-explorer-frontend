import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./App.css";
import AppRouter from "../../providers/router/AppRouter";

function App() {
  return (
    <div className="page">
      <Header />
        <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
