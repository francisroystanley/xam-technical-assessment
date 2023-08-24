import { ChangeEvent, useCallback, useEffect, useState } from "react";

const useForm = <T extends Record<string, any>>(initialFormValue: T) => {
  const initialFormErrorValue = Object.keys(initialFormValue).reduce((obj, curr: keyof T) => {
    obj[curr] = false;

    return obj;
  }, {} as Record<keyof T, boolean>);
  const [formValue, setFormValue] = useState(initialFormValue);
  const [formErrorValue, setFormErrorValue] = useState(initialFormErrorValue);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSubmitted = () => {
    setIsSubmitted(true);
  };

  const hasError = () => {
    return Object.values(formErrorValue).some(value => value === true);
  };

  const getClassName = (name: keyof typeof formErrorValue) => {
    return formErrorValue[name] ? "has-error" : undefined;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValue(prevState => ({ ...prevState, [name]: value }));
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormValue(initialFormValue);
  };

  const validate = useCallback(() => {
    Object.entries(formValue).forEach(([name, value]) => {
      setFormErrorValue(prevState => ({ ...prevState, [name]: value.trim().length === 0 }));
    });
  }, [formValue]);

  useEffect(() => {
    validate();
  }, [validate]);

  return {
    formSubmitted,
    formValue,
    getClassName,
    handleChange,
    hasError,
    isSubmitted,
    resetForm,
    validate
  };
};

export default useForm;
