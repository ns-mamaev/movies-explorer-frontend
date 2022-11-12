import { useState , useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import FormInput from '../FormInput/FormInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import './Profile.css'

const Profile = ({ onLogout }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='profile'>
      <div className='profile__inner'>
        <h1 className='profile__heading'>Привет, {currentUser?.name}!</h1>
        <form className='profile__form' onSubmit={(e) => e.preventDefault()}>
          <fieldset className='profile__form-fields'>
            <FormInput name='name' title='Имя' type='text' disabled={!isEditMode} value={currentUser?.name} variant='min' />
            <FormInput name='email' title='E-mail' type='email' disabled={!isEditMode} value={currentUser?.email} variant='min' />
          </fieldset>
          {isEditMode && <SubmitButton>Сохранить</SubmitButton>}
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
