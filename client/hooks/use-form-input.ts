import { useState } from 'react';
import { Schema } from 'yup';

export const useFormInput = (options?: {
  validationSchema?: Schema<any>;
  validation?: any;
}) => {
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState<string>(undefined);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const validate = async () => {
    if (options.validationSchema) {
      try {
        await options.validationSchema.validate(value);
        setErrors(undefined);
        return true;
      } catch (e) {
        setErrors(e.errors[0]);
      }
    } else if (options.validation) {
      try {
        options.validation(value);
        setErrors(undefined);
      } catch (e) {
        setErrors(e.message);
      }
    }
  };

  return {
    value,
    setValue,
    errors,
    setErrors,
    onChange,
    validate,
  };
};
