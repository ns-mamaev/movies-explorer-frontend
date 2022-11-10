import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ visible }) => {
  return (
    <div className={`navigation ${visible && 'navigation_view_mobile_visible'}`}>
      <nav className={`navigation__inner ${visible && 'navigation__inner_view_mobile-visible'}`}>
        <ul className='navigation__links'>
          <li><Link className='navigation__link' to='/'>Главная</Link></li>
          <li><Link className='navigation__link' to='/movies'>Фильмы</Link></li>
          <li><Link className='navigation__link' to='/saved-movies'>Сохраненные фильмы</Link></li>
        </ul>
        <Link className='navigation__link' to='/profile'>
          Аккаунт
          <div className='navigation__link-icon navigation__link-icon_type_profile' />
        </Link>
      </nav>
    </div>
  )
};

export default Navigation;
