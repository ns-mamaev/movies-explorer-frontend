import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  return (
    <main className='page-not-found'>
      <div className='page-not-found__banner'>
        <h1 className='page-not-found__title'>404</h1>
        <p className='page-not-found__title-message'>Страница не найдена</p>
      </div>
      <Link className='page-not-found__back-link' to={'/movies'}>Назад</Link>
    </main>
  );
}

export default PageNotFound;
