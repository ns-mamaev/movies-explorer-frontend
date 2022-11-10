import './FormInput.css';

function FormInput({ title, name, variant, ...restProps }) {
  return (
    <div className={`form-input form-input_variant_${variant}`}>
      <label
        className={`form-input__title form-input__title_variant_${variant}`}
        htmlFor={name}
      >{title}</label>
      <input
        className={`form-input__input form-input__input_variant_${variant}`}
        id={name}
        {...restProps}
      />
      <span
        className={`form-input__error-message form-input__error-message_variant_${variant}`}
      >Ошиибка</span>
    </div>
  )
}

export default FormInput;
