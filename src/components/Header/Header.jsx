import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header = () => {
  const location = useLocation().pathname;
  const isLocationLanding = location === '/';
  const [burgerOpened, setBurgerOpened] = useState(false);

  const openBurger = () => {
    setBurgerOpened(state => !state);
  };

  return (
    <header className={`header ${isLocationLanding && 'header_place_landing'}`}>
      <Logo />
      <button
        className={`header__burger ${burgerOpened ? 'header__burger_opended' : ''}`}
        type='button'
        onClick={openBurger}
      />
      {/* <nav className='navigation'>
        {isLocationLanding
          ? (<ul className='navigation__links'>
            <li><Link className='navigation__link' to='/signup'>Регистрация</Link></li>
            <li><Link className='navigation__link navigation__link_hightlighted' to='/signin'>Войти</Link></li>
          </ul>) : (<ul className='navigation__links'>
            <li><Link className='navigation__link' to='/movies'>Фильмы</Link></li>
            <li><Link className='navigation__link' to='/saved-movies'>Сохраненные фильмы</Link></li>
          </ul>)}
      </nav> */}
    <Navigation visible={burgerOpened} />
    </header>
  );
};

export default Header;
