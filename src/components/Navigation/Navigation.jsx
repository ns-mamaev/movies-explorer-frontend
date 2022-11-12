import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ visible }) => {

  const setLinkClass = (navData) => navData.isActive
    ? 'navigation__link navigation__link_active'
    : 'navigation__link';

  return (
    <div className={`navigation ${visible && 'navigation_visible'}`}>
      <nav className={`navigation__inner ${visible && 'navigation__inner_visible'}`}>
        <ul className='navigation__links'>
          <li className='navigation__links-item navigation__links-item_type_only-mobile'>
            <NavLink className={setLinkClass} to='/'>
              Главная
            </NavLink>
          </li>
          <li className='navigation__links-item'>
            <NavLink className={setLinkClass} to='/movies'>
              Фильмы
            </NavLink>
          </li>
          <li className='navigation__links-item'>
            <NavLink className={setLinkClass} to='/saved-movies'>
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
        <Link className='navigation__link navigation__link_type_with-icon' to='/profile'>
          Аккаунт
          <div className='navigation__link-icon navigation__link-icon_content_profile' />
        </Link>
      </nav>
    </div>
  )
};

export default Navigation;
