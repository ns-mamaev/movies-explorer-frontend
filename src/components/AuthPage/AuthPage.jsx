import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import SubmitButton from '../SubmitButton/SubmitButton';
import './AuthPage.css';

function AuthPage({
  children,
  heading,
  type,
}) {
  const onSubmit = (e) => {
    e.preventDefault();
  }

  const texts = type === 'register'
    ? {
      buttonText: 'Зарегистрироваться',
      linkPath: '/signin',
      linkText: 'Войти',
      formCaption: 'Уже зарегистрированы?'
    } : {
      buttonText: 'Войти',
      linkPath: '/signup',
      linkText: 'Регистрация',
      formCaption: 'Ещё не зарегистрированы?'
    };

  return (
    <main className='auth-page'>
      <div className='auth-page__inner'>
        <Logo />
        <h1 className='auth-page__heading'>{heading}</h1>
        <form className='auth-page__form' name={type} onSubmit={onSubmit}>
          <fieldset className='auth-page__form-fields'>
            {children}
          </fieldset>
          <SubmitButton>{texts.buttonText}</SubmitButton>
        </form>
        <div className='auth-page__caption'>
          <p className='auth-page__caption-text'>{texts.formCaption}</p>
          <Link className='auth-page__link' to={texts.linkPath}>{texts.linkText}</Link>
        </div>
      </div>
    </main>
  );
}

export default AuthPage;
