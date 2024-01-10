import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/userSelectors';

const Navigation = ({ visible, onClose }) => {
  const user = useSelector(userSelector);

  const setLinkClass = (navData) => navData.isActive
    ? 'navigation__link navigation__link_active'
    : 'navigation__link';

  function handleCloseByOverlay (e) {
    if (e.target.classList.contains('navigation_visible')) {
      onClose();
    }
  };

  return (
    <div className={`navigation ${visible && 'navigation_visible'}`} onClick={handleCloseByOverlay} >
      <nav className={`navigation__inner ${visible && 'navigation__inner_visible'}`}>
        <ul className='navigation__links'>
          <li className='navigation__links-item'>
            <NavLink className={setLinkClass} to='/' onClick={onClose}>
              Рулетка
            </NavLink>
          </li>
          <li className='navigation__links-item'>
            <NavLink className={setLinkClass} to='/movies' onClick={onClose}>
              Все фильмы
            </NavLink>
          </li>
          <li className='navigation__links-item'>
            <NavLink className={setLinkClass} to='/saved' onClick={onClose}>
              Избранное
            </NavLink>
          </li>
        </ul>
        <Link className='navigation__link navigation__link_type_with-icon' to='/profile' onClick={onClose}>
          {user && user.name}
          <div className='navigation__link-icon navigation__link-icon_content_profile' />
        </Link>
      </nav>
    </div>
  )
};

export default Navigation;
