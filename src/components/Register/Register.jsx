import AuthPage from '../AuthPage/AuthPage';
import FormInput from '../FormInput/FormInput';

function Register() {
  return (
    <AuthPage
      type='register'
      heading='Добро пожаловать!'
    >
      <FormInput name='name' title='Имя' type='text' />
      <FormInput name='email' title='E-mail' type='email' />
      <FormInput name='password' title='Пароль' type='password' />
    </AuthPage>
  );
}

export default Register;
