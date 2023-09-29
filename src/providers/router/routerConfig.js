import LoginPage from "../../pages/LoginPage/LoginPage"
import MoviePage from "../../pages/MoviePage/MoviePage"
import MoviesPage from "../../pages/MoviesPage/MoviesPage"
import ProfilePage from "../../pages/ProfilePage/ProfilePage"
import RegisterPage from "../../pages/RegisterPage/RegisterPage"
import RoulettePage from "../../pages/RoulettePage/RoulettePage"
import SavedPage from "../../pages/SavedPage/SavedPage"
import { LOGIN_PAGE, MAIN_PAGE, MOVIES_PAGE, MOVIE_PAGE, PROFILE_PAGE, REGISTER_PAGE, SAVED_PAGE } from "./routes"

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
    path: REGISTER_PAGE,
    Component: RegisterPage, 
  },
  {
    path: LOGIN_PAGE,
    Component: LoginPage, 
  },
  {
    path: PROFILE_PAGE,
    Component: ProfilePage, 
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
    path: '*',
    Component: RoulettePage, 
  },
]
