import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if it's a number and convert
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(e.target.value);
    }
    setValues({
      // copy existing values into it
      ...values,
      // update new value that changed
      // name in this is case is the name attribute of the <input/> and we are making it the value that the user types
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}
