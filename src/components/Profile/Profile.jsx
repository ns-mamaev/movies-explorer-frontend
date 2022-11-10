import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import './Profile.css'

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  return (
    <main className='profile'>
      <div className='profile__inner'>
        <h1 className='profile__heading'>Привет, Никита!</h1>
        <form className='profile__form'>
          <fieldset className='profile__form-fields'>
            <FormInput name='name' title='Имя' type='text' disabled={!isEditMode} value='Тест' variant='min' />
            <FormInput name='email' title='E-mail' type='email' disabled={!isEditMode} value='test@ya.ru' variant='min' />
          </fieldset>
          {isEditMode && <SubmitButton>Сохранить</SubmitButton>}
        </form>
        {!isEditMode && (
          <div className='profile__buttons'>
            <button className='profile__button profile__button_type_standart' type='button' onClick={() => setIsEditMode(true)}>Редактировать</button>
            <button className='profile__button profile__button_type_danger' type='button' onClick={() => navigate('/')}>Выйти из аккаунта</button>
          </div>
        )}
      </div>
    </main>
  )
};

export default Profile;
