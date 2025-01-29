import React from 'react';
import { Autocomplete, TextField, AutocompleteProps } from '@mui/material';

interface ICustomAutoCompleteProps {
  options: { label: string; value: string }[];
  setFieldValue: (field: string, value: any) => void;
  value: string
  error?: string
  fieldName: string;
  label: string;
  touched: any;
}

const CustomAutocomplete: React.FC<ICustomAutoCompleteProps> = ({
  options,
  setFieldValue,
  value,
  touched,
  error,
  fieldName,
  label
}) => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      value={options.find((option) => option.value === value) || null}
      onChange={(event, newValue) => {
        setFieldValue(fieldName, newValue ? newValue.value : '');
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={touched[fieldName] && Boolean(error)}
          helperText={
            touched[fieldName] && error
              ? error
              : ''
          }
        />
      )}
      fullWidth
    />
  );
};

export default CustomAutocomplete;
