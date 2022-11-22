import AuthPage from '../AuthPage/AuthPage';
import FormInput from '../FormInput/FormInput';

function Register({ onSubmit }) {
  return (
    <AuthPage
      type='register'
      heading='Добро пожаловать!'
      onSubmit={onSubmit}
    >
      <FormInput variant='max' name='name' title='Имя' type='text' />
      <FormInput variant='max' name='email' title='E-mail' type='email' errorMessage='введенный e-mail некорректен' />
      <FormInput variant='max' name='password' title='Пароль' type='password' />
    </AuthPage>
  );
}

export default Register;
