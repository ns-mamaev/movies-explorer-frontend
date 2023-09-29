import { Link } from 'react-router-dom';
import Button, { BUTTON_COLOR } from '../Button/Button';
import './AuthForm.css';

function AuthForm({
  children,
  heading,
  type,
  onSubmit,
  isValid,
  inLoading,
  error,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
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
    <main className='auth-page content-width'>
      <div className='auth-page__inner'>
        <Link className='auth-page__logo' to='/' />
        <h1 className='auth-page__heading'>{heading}</h1>
        <form className='auth-page__form' name={type} onSubmit={handleSubmit}>
          <fieldset className='auth-page__form-fields'>
            {children}
          </fieldset>
        <div className='auth-page__button-wrapper'>
          <span className='auth-page__error-message'>{error}</span>
          <Button className="auth-page__button" color={BUTTON_COLOR.gradient} disabled={!isValid || inLoading} text={texts.buttonText}/>
        </div>
        </form>
        <div className='auth-page__caption'>
          <p className='auth-page__caption-text'>{texts.formCaption}</p>
          <Link className='auth-page__link' to={texts.linkPath}>{texts.linkText}</Link>
        </div>
      </div>
    </main>
  );
}

export default AuthForm;
