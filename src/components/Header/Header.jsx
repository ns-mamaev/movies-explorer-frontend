import './Header.css';

const Header = () => {
  return (
    <header className='header header_place_langing'>
      <div className='header__inner'>
        <div className='header__logo'></div>
        <nav className='navigation'>
          <ul className='navigation__links'>
            <li><a className='navigation__link' href='#'>Регистрация</a></li>
            <li><a className='navigation__link navigation__link_hightlighted' href='#'>Войти</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
