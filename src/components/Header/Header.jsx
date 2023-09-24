import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

const Header = () => {
  const location = useLocation().pathname;
  const isLocationLanding = location === "/";

  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  const currentUser = 123;

  const openBurger = () => {
    setIsBurgerOpened((state) => !state);
  };

  const closeBurger = () => {
    setIsBurgerOpened(false);
  };

  return (
    <header className="header">
      <div className="header__inner content-width">
        <Link className="header__logo" to="/" title="На главную" />
        {currentUser && (
          <button
            className={`header__burger ${
              isBurgerOpened ? "header__burger_opended" : ""
            }`}
            type="button"
            onClick={openBurger}
          />
        )}
        {currentUser ? (
          <Navigation visible={isBurgerOpened} onClose={closeBurger} />
        ) : (
          <nav className="header__auth">
            <ul className="header__auth-links">
              <li>
                <Link className="header__auth-link" to="/signup">
                  Регистрация
                </Link>
              </li>
              <li>
                <Link
                  className="header__auth-link header__auth-link_hightlighted"
                  to="/signin"
                >
                  Войти
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
