import Logo from '../Logo/Logo';
import './EntranceForm.css';

function EntranceForm({ children, buttonText }) {
  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form className='entrance-form' name='заглушка' onSubmit={onSubmit}>
      <fieldset className='entrance-form__fields'>
        {children}
      </fieldset>
      <button className='entrance-form__button' type='submit'>{buttonText}</button>
    </form>
  );
}

export default EntranceForm;
