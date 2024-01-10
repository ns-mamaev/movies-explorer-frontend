import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/AuthForm/AuthForm";
import FormInput from "../../components/FormInput/FormInput";
import { LOGIN_PAGE, MAIN_PAGE } from "../../providers/router/routes";
import { EMAIL_PATTERN, FETCH_STATUS } from "../../utills/constants";
import useFormWithValidation from "../../utills/hooks/useFormWithValidation";
import { clearFetchRegisterStatus, fetchUserRegister } from "../../store/user/userSlice";
import { userFetchRegisterSelector } from "../../store/user/userSelectors";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RegisterPage() {
  const { values, errors, isValid, onChange, resetForm } = useFormWithValidation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(userFetchRegisterSelector);

  const handleSubmit = () => {
    if (!isValid) {
      return
    }
    if (values.password !== values.passwordRepeat) {
      return resetForm(values, { passwordRepeat: 'пароли не совпадают' });
    }
    dispatch(fetchUserRegister({ name: values.name, email: values.email, password: values.password }));
  };

  useEffect(() => {
    if (status === FETCH_STATUS.fulfilled) {
      navigate(MAIN_PAGE);
      dispatch(clearFetchRegisterStatus())
    }
  }, [navigate, status, dispatch])

  return (
    <AuthForm
      type="register"
      heading="Добро пожаловать!"
      buttonText='Зарегистрироваться'
      formCaption='Уже есть аккаунт?'
      linkText='Войти'
      linkPath={LOGIN_PAGE}
      isValid={isValid}
      onSubmit={handleSubmit}
      error={error}
      inLoading={status === FETCH_STATUS.pending}
    >
      <FormInput
        value={values.name}
        error={errors.name}
        onChange={onChange}
        variant="max"
        name="name"
        title="Имя"
        type="text"
        required
        minLength="3"
      />
      <FormInput
        value={values.email}
        error={errors.email}
        onChange={onChange}
        variant="max"
        name="email"
        title="E-mail"
        type="email"
        pattern={EMAIL_PATTERN}
        required
      />
      <FormInput
        value={values.password}
        error={errors.password}
        onChange={onChange}
        variant="max"
        name="password"
        title="Пароль"
        type="password"
        minLength="6"
        required
      />
      <FormInput
        value={values.passwordRepeat}
        error={errors.passwordRepeat}
        onChange={onChange}
        variant="max"
        name="passwordRepeat"
        title="Пароль (ещё раз)"
        type="password"
        minLength="6"
        required
      />
    </AuthForm>
  );
}

export default RegisterPage;
