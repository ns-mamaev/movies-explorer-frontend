import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AppRouter from "../../providers/router/AppRouter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../store/user/userSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  // аутентификация юзера по токену
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="page">
      <Header />
        <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
