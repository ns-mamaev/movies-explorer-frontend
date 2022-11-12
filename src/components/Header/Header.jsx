import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header = () => {

  const location = useLocation().pathname;
  const isLocationLanding = location === '/';

  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  const openBurger = () => {
    setIsBurgerOpened(state => !state);
  };

  return (
    <header className={`header ${isLocationLanding && 'header_place_landing'}`}>
      <Logo />
      {currentUser &&
        (<button
          className={`header__burger ${isBurgerOpened ? 'header__burger_opended' : ''}`}
          type='button'
          onClick={openBurger}
        />)
      }
      {
        currentUser
          ? <Navigation visible={isBurgerOpened} />
          : (
            <nav className='header__auth'>
              <ul className='header__auth-links'>
                <li><Link className='header__auth-link' to='/signup'>Регистрация</Link></li>
                <li><Link className='header__auth-link header__auth-link_hightlighted' to='/signin'>Войти</Link></li>
              </ul>
            </nav>
          )
      }
    </header>
  );
};

export default Header;
