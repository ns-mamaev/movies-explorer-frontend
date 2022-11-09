import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Header.css';

const Header = () => {
  const location = useLocation().pathname;
  return (
    <header className={`header ${location === '/' ? 'header_place_landing' : ''}`}>
      <Logo />
      <nav className='navigation'>
        <ul className='navigation__links'>
          <li><Link className='navigation__link' to='/signup'>Регистрация</Link></li>
          <li><Link className='navigation__link navigation__link_hightlighted' to='/signin'>Войти</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
