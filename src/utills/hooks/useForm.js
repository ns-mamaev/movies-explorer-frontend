import { useState } from 'react';

function useForm() {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  }

  return { values, handleChange, setValues }
}