import { Link } from 'react-router-dom';
import EntranceForm from '../EntranceForm/EntranceForm';
import FormInput from '../FormInput/FormInput';
import './Login.css';

function Login() {
  return (
    <section className='register'>
      <div className='register__inner'>
        <h1 className='register__title'>Рады видеть</h1>
        <div className='register__logo'></div>
        <EntranceForm buttonText='Зарегистрироваться'>
          <FormInput name='email' title='E-mail' type='email' />
          <FormInput name='password' title='Пароль' type='password' />
        </EntranceForm>
        <div className='register__form-caption'>
          <p className='register__form-question'>Ещё не зарегистрированы?</p>
          <Link className='register__login-link' to='/signup'>Регистрация</Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
