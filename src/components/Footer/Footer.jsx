import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__columns'>
        <p className='footer__column footer__column_content_copyright'>&#xa9; {new Date().getFullYear()} Никита Мамаев</p>
        <nav className='footer__column footer__column_content_nav-links'>
          <ul className='footer__links'>
            <li className='footer__link-item'>
              <Link to='/about' className='footer__link'>Об авторе</Link>
            </li>
            <li className='footer__link-item'>
              <a className='footer__link' href='https://github.com/ns-mamaev' target='_blank' rel='noreferrer'>Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
};

export default Footer;
