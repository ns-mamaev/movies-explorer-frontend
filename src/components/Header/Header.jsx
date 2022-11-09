import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Header.css';

const Header = () => {
  const location = useLocation().pathname;

  return (
    <header className={`header ${location === '/' ? 'header_place_landing' : ''}`}>
      <Logo />
      <nav className='navigation'>
        <ul className='navigation__links'>
          <li><a className='navigation__link' href='#'>Регистрация</a></li>
          <li><a className='navigation__link navigation__link_hightlighted' href='#'>Войти</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
