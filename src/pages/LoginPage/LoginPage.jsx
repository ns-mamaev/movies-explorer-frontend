import { useDispatch, useSelector } from 'react-redux';
import { EMAIL_PATTERN, FETCH_STATUS } from '../../utills/constants';
import useFormWithValidation from '../../utills/hooks/useFormWithValidation';
import AuthPage from '../../components/AuthForm/AuthForm';
import FormInput from '../../components/FormInput/FormInput';
import { clearFetchLoginStatus, fetchUserLogin } from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { MAIN_PAGE, REGISTER_PAGE } from '../../providers/router/routes';
import { userFetchLoginSelector } from '../../store/user/userSelectors';
import { useEffect } from 'react';

function LoginPage() {
  const {
    values,
    errors,
    isValid,
    onChange,
  } = useFormWithValidation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(userFetchLoginSelector);

  const handleSubmit = () => {
    if (isValid) {
      dispatch(fetchUserLogin(values));
    }
  };

  useEffect(() => {
    if (status === FETCH_STATUS.fulfilled) {
      navigate(MAIN_PAGE);
      dispatch(clearFetchLoginStatus());
    }
  }, [status, navigate, dispatch])

  return (
    <AuthPage
      heading='Рады видеть!'
      buttonText='Войти'
      formCaption='Ещё не зарегистрированы?'
      linkText='Регистрация'
      linkPath={REGISTER_PAGE}
      onSubmit={handleSubmit}
      isValid={isValid}
      error={error}
      inLoading={status === FETCH_STATUS.pending}
    >
      <FormInput
        value={values.email}
        error={errors.email}
        onChange={onChange}
        variant='max'
        name='email'
        title='E-mail'
        type='email'
        pattern={EMAIL_PATTERN}
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

export default LoginPage;
