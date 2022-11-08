import { Link } from 'react-router-dom';
import EntranceForm from '../EntranceForm/EntranceForm';
import FormInput from '../FormInput/FormInput';
import './Register.css';

function Register() {
  return (
    <section className='register'>
      <div className='register__inner'>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <div className='register__logo'></div>
        <EntranceForm buttonText='Зарегистрироваться'>
          <FormInput name='name' title='Имя' type='text' />
          <FormInput name='email' title='E-mail' type='email' />
          <FormInput name='password' title='Пароль' type='password' />
        </EntranceForm>
        <div className='register__form-caption'>
          <p className='register__form-question'>Уже зарегистрированы?</p>
          <Link className='register__login-link' to='/signin'>Войти</Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
