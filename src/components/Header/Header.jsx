import Logo from '../Logo/Logo';
import './Header.css';

const Header = () => {
  return (
    <header className='header header_place_langing'>
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
