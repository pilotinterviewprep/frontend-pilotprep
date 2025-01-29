import { TextField, TextFieldProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useState } from 'react';
import { Iconify } from '../iconify';
import { ErrorText } from './error-text';

export const CustomPasswordInput: React.FC<TextFieldProps> = ({
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
        id="password"
        size='small'
        placeholder='Password'
        type={showPassword ? 'text' : 'password'}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                {showPassword ? (
                  <Iconify icon="solar:eye-outline" color="var(--grey-600)" />
                ) : (
                  <Iconify icon="iconamoon:eye-off-light" color="var(--grey-600)"/>
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
