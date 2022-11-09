import './FormInput.css';

function FormInput({ title, name, variant, ...restProps }) {
  return (
    <div className='form-input'>
      <label
        className={`form-input__title ${variant && 'form-input__title_variant_min'}`}
        htmlFor={name}
      >{title}</label>
      <input
        className={`form-input__input ${variant && 'form-input__input_variant_min'}`}
        id={name}
        {...restProps}
      />
      <span
        className={`form-input__error-message ${variant && 'form-error-message__input_variant_min'}`}
      >Ошиибка</span>
    </div>
  )
}

export default FormInput;
