import AuthForm from "../../components/AuthForm/AuthForm";
import FormInput from "../../components/FormInput/FormInput";
import { EMAIL_PATTERN } from "../../utills/constants";
import useFormWithValidation from "../../utills/hooks/useFormWithValidation";

function RegisterPage({ onSubmit, error, inLoading }) {
  const { values, errors, isValid, onChange } = useFormWithValidation();

  // оборачиваю еще в 1 функцию чтобы передать values, которые недоступны в App
  const handleSubmit = () => onSubmit(values);

  return (
    <AuthForm
      type="register"
      heading="Добро пожаловать!"
      isValid={isValid}
      onSubmit={handleSubmit}
      error={error}
      inLoading={inLoading}
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
