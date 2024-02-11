/* eslint-disable react/prop-types */
import { Button } from '@mui/material/'
import { useFormikContext } from 'formik';

const ButtonWrapper = ({
  color,
  children,
  // eslint-disable-next-line no-unused-vars
  ...otherProps
}) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    variant: 'contained',
    color: color ?? 'primary',
    fullWidth: true,
    onClick: handleSubmit,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
