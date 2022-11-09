import { useState } from 'react';
import FormInput from '../FormInput/FormInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import './Profile.css'

const Profile = () => {

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <main className='profile'>
      <h1 className='profile__heading'>Привет, Никита!</h1>
      <form className='profile__form'>
        <fieldset className='profile__form-fields'>
          <FormInput name='name' title='Имя' type='text' disabled={!isEditMode} value='Тест' variant='min'/>
          <FormInput name='email' title='E-mail' type='email' disabled={!isEditMode} value='test@ya.ru' variant='min'/>
        </fieldset>
        {isEditMode && (<SubmitButton>Сохранить</SubmitButton>)}
      </form>
      {!isEditMode &&
        (<div className=''>
          <button type='button' onClick={() => setIsEditMode(true)}>Редактировать</button>
          <button type='button'>Выйти из аккаунта</button>
        </div>)
      }
    </main>
  )
};

export default Profile;
