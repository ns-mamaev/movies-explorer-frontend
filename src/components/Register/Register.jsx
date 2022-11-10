import AuthPage from '../AuthPage/AuthPage';
import FormInput from '../FormInput/FormInput';

function Register() {
  return (
    <AuthPage
      type='register'
      heading='Добро пожаловать!'
    >
      <FormInput variant='max' name='name' title='Имя' type='text' />
      <FormInput variant='max' name='email' title='E-mail' type='email' />
      <FormInput variant='max' name='password' title='Пароль' type='password' />
    </AuthPage>
  );
}

export default Register;
