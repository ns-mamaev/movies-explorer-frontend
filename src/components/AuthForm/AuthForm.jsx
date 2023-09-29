import { Link } from 'react-router-dom';
import Button, { BUTTON_COLOR } from '../Button/Button';
import './AuthForm.css';

function AuthForm({
  children,
  heading,
  onSubmit,
  isValid,
  inLoading,
  error,
  linkText,
  linkPath,
  formCaption,
  buttonText,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  }
  
  return (
    <main className='auth-page content-width'>
      <div className='auth-page__inner'>
        <h1 className='auth-page__heading'>{heading}</h1>
        <form className='auth-page__form' onSubmit={handleSubmit}>
          <fieldset className='auth-page__form-fields'>
            {children}
          </fieldset>
        <div className='auth-page__button-wrapper'>
          <span className='auth-page__error-message'>{error}</span>
          <Button type="submit" className="auth-page__button" color={BUTTON_COLOR.gradient} disabled={!isValid || inLoading} text={buttonText} withDisable />
        </div>
        </form>
        <div className='auth-page__caption'>
          <p className='auth-page__caption-text'>{formCaption}</p>
          <Link className='auth-page__link' to={linkPath}>{linkText}</Link>
        </div>
      </div>
    </main>
  );
}

export default AuthForm;
