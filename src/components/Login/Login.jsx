import { useEffect } from 'react';
import useFormWithValidation from '../../utills/hooks/useFormWithValidation';
import AuthPage from '../AuthPage/AuthPage';
import FormInput from '../FormInput/FormInput';

function Login({ onSubmit }) {

  const {
    values,
    errors,
    isValid,
    onChange,
  } = useFormWithValidation();

  return (
    <AuthPage
      type='login'
      heading='Рады видеть!'
      onSubmit={onSubmit}
      isValid={isValid}
    >
      <FormInput
        value={values.email}
        error={errors.email}
        onChange={onChange}
        variant='max'
        name='email'
        title='E-mail'
        type='email'
        required
      />
      <FormInput
        value={values.password}
        error={errors.password}
        onChange={onChange}
        variant='max'
        name='password'
        title='Пароль'
        type='password'
        minLength='6'
        required
      />
    </AuthPage>
  );
}

export default Login;
