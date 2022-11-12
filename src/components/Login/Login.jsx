import AuthPage from '../AuthPage/AuthPage';
import FormInput from '../FormInput/FormInput';

function Login({ onSubmit }) {

  return (
    <AuthPage
      type='login'
      heading='Рады видеть!'
      onSubmit={onSubmit}
    >
      <FormInput variant='max' name='email' title='E-mail' type='email' />
      <FormInput variant='max' name='password' title='Пароль' type='password' />
    </AuthPage>
  );
}

export default Login;
