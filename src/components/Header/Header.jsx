import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header = () => {

  const location = useLocation().pathname;
  const isLocationLanding = location === '/';

  const [burgerOpened, setBurgerOpened] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  const openBurger = () => {
    setBurgerOpened(state => !state);
  };

  console.log(currentUser)

  return (
    <header className={`header ${isLocationLanding && 'header_place_landing'}`}>
      <Logo />
      <button
        className={`header__burger ${burgerOpened ? 'header__burger_opended' : ''}`}
        type='button'
        onClick={openBurger}
      />
      {
        currentUser
          ? <Navigation visible={burgerOpened} />
          : (
            <nav className='navigation'>
              <ul className='navigation__links'>
                <li><Link className='navigation__link' to='/signup'>Регистрация</Link></li>
                <li><Link className='navigation__link navigation__link_hightlighted' to='/signin'>Войти</Link></li>
              </ul>
            </nav>
          )
      }
    </header>
  );
};

export default Header;
