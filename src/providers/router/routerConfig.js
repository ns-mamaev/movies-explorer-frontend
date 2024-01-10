import LoginPage from "../../pages/LoginPage/LoginPage";
import MoviePage from "../../pages/MoviePage/MoviePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import RoulettePage from "../../pages/RoulettePage/RoulettePage";
import SavedPage from "../../pages/SavedPage/SavedPage";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import {
  LOGIN_PAGE,
  MAIN_PAGE,
  MOVIES_PAGE,
  MOVIE_PAGE,
  PROFILE_PAGE,
  REGISTER_PAGE,
  SAVED_PAGE,
} from "./routes";

export const authRoutes = [
  {
    path: PROFILE_PAGE,
    Component: ProfilePage,
  },
];

export const loginRoutes = [
  {
    path: REGISTER_PAGE,
    Component: RegisterPage,
  },
  {
    path: LOGIN_PAGE,
    Component: LoginPage,
  },
];

export const publicRoutes = [
  {
    path: MOVIES_PAGE,
    Component: MoviesPage,
  },
  {
    path: MOVIE_PAGE,
    Component: MoviePage,
  },
  {
    path: SAVED_PAGE,
    Component: SavedPage,
  },
  {
    path: MAIN_PAGE,
    Component: RoulettePage,
  },
  {
    path: "*",
    Component: PageNotFound,
  },
];


function result(A, B) {
  if (A.length !== B.length) {
    return 0;
  }
  const AMap = {},
        BMap = {};

  for (let i = 0; i < A.length; i += 1) {
    if (A[i] in AMap) {
      A[i] += 1;
    } else {
      A[i] = 1;
    }
    if (B[i] in BMap) {
      B[i] += 1;
    } else {
      B[i] = 1;
    }
  }

  console.log(AMap, BMap)

  for (let key in AMap) {
    if (AMap[key] !== BMap[key]) {
      return 0;
    }
  }

  return 1;
}


/*

*/

