import { useState, useEffect } from 'react';
import { EMAIL_PATTERN } from '../../utills/constants';
import useFormWithValidation from '../../utills/hooks/useFormWithValidation';
import './ProfilePage.css'
import FormInput from '../../components/FormInput/FormInput';

const ProfilePage = ({ onSubmit, onLogout, error, infoMessage, inLoading }) => {
  const [isUserInfoChanged, setIsUserInfoChanged] = useState(false);
  const currentUser = { name: 'USER', email: 'mail@mail.ru' }

  const {
    values,
    errors,
    isValid,
    onChange,
    resetForm,
  } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values)
  };

  // проверим изменились ли данные пользователя
  useEffect(() => {
    if (values.name !== currentUser.name || values.email !== currentUser.email) {
      setIsUserInfoChanged(true);
    } else {
      setIsUserInfoChanged(false);
    }
  }, [values?.name, values?.email]);

  // подстановка данных профиля при монтировании
  // useEffect(() => {
  //   resetForm({ name: currentUser?.name, email: currentUser?.email });
  // }, [currentUser])

  return (
    <main className='profile'>
      <div className='profile__inner'>
        <h1 className='profile__heading'>Привет, {currentUser?.name}!</h1>
        <form className='profile__form' onSubmit={handleSubmit}>
          <fieldset className='profile__form-fields'>
            <FormInput
              name='name'
              title='Имя'
              type='text'
              value={values.name}
              error={errors.name}
              onChange={onChange}
              variant='min'
              minLength='3'
              required
            />
            <FormInput
              name='email'
              title='E-mail'
              type='email'
              value={values.email}
              error={errors.email}
              onChange={onChange}
              variant='min'
              pattern={EMAIL_PATTERN}
              required
            />
          </fieldset>
          <div className='profile__buttons'>
            <span className={`profile__message ${error && 'profile__message_type_error'}`}>
              {infoMessage || error}
            </span>
            <button
              className='profile__button profile__button_type_standart'
              type='submit'
              disabled={!isValid || !isUserInfoChanged || inLoading}
            >
              Редактировать
            </button>
            <button className='profile__button profile__button_type_danger' type='button' onClick={onLogout}>Выйти из аккаунта</button>
          </div>
        </form>
      </div>
    </main>
  )
};

export default ProfilePage;
