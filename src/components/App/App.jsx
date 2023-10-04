import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AppRouter from "../../providers/router/AppRouter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../store/user/userSlice";
import "./App.css";
import { userFetchAuthSelector } from "../../store/user/userSelectors";
import { FETCH_STATUS } from "../../utills/constants";
import Preloader from "../Preloader/Preloader";

function App() {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(userFetchAuthSelector);

  // аутентификация юзера по токену
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="page">
      {loadingStatus === FETCH_STATUS.pending ? (
        <Preloader />
      ) : (
        <>
          <Header />
          <AppRouter />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
