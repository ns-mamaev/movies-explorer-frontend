import './FormInput.css';

function FormInput({ title, name, ...restProps }) {
  return (
    <div className='form-input'>
      <label className='form-input__title' htmlFor={name}>{ title }</label>
      <input className='form-input__input' id={name} {...restProps} />
      <span className='form-input__error-message'></span>
    </div>
  )
}

export default FormInput;
