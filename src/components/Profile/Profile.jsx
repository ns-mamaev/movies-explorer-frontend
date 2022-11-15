import { useState , useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../utills/hooks/useFormWithValidation';
import FormInput from '../FormInput/FormInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import './Profile.css'

const Profile = ({ onLogout }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsEditMode(false);
  };

  const {
    values,
    errors,
    isValid,
    onChange,
    resetForm,
  } = useFormWithValidation();

  useEffect(() => {
    resetForm({ name: currentUser?.name, email: currentUser?.email });
  }, [currentUser])

  return (
    <main className='profile'>
      <div className='profile__inner'>
        <h1 className='profile__heading'>Привет, {currentUser?.name}!</h1>
        <form className='profile__form' onSubmit={onSubmit}>
          <fieldset className='profile__form-fields'>
            <FormInput
              name='name'
              title='Имя'
              type='text'
              disabled={!isEditMode}
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
              disabled={!isEditMode}
              value={values.email}
              error={errors.email}
              onChange={onChange}
              variant='min'
              required
            />
          </fieldset>
          {isEditMode && <SubmitButton disabled={!isValid}>Сохранить</SubmitButton>}
        </form>
        {!isEditMode && (
          <div className='profile__buttons'>
            <button className='profile__button profile__button_type_standart' type='button' onClick={() => setIsEditMode(true)}>Редактировать</button>
            <button className='profile__button profile__button_type_danger' type='button' onClick={onLogout}>Выйти из аккаунта</button>
          </div>
        )}
      </div>
    </main>
  )
};

export default Profile;
