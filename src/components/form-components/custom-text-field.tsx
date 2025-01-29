import { TextField, TextFieldProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import React, { useState } from 'react';
import { ErrorText } from './error-text';

export const CustomTextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  error,
  onBlur,
  helperText,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl variant="outlined" error={error} fullWidth>
      <TextField
        fullWidth
        size="small"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        sx={{ width: '100%' }}
        {...props}
      />
      {error && <ErrorText error={helperText} />}
    </FormControl>
  );
};
