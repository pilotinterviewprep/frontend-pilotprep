import React from 'react';

import { LoadingButton } from '@mui/lab';
import { FormLabel, Grid, TextField } from '@mui/material';

import { useSendOTPMutation } from 'src/redux/features/auth/auth-api';

import { useFormik } from 'formik';
import { formConstants } from 'src/constants/form-constants';
import { IErrorResponse } from 'src/redux/interfaces/common';
import * as Yup from 'yup';
import { defaultUser } from '../utils/auth.types';

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required(formConstants.required),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters long')
    .required(formConstants.required),
  email: Yup.string().email(formConstants.invalidEmail).required(formConstants.required),
});

interface IProps {
  setNextStep: (value: number) => void;
  setErrorMsg: (value: string) => void;
}
export const SignUpFirstForm = ({ setNextStep, setErrorMsg }: IProps) => {
  const [sendOTP, { isLoading: isSendingOTP }] = useSendOTPMutation();
  const [loading, setLoading] = React.useState(false);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setValues,
    setFieldValue,
    isValid,
    resetForm,
    touched,
  } = useFormik({
    initialValues: defaultUser,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await sendOTP(values);
      if (res?.error) {
        setErrorMsg((res?.error as IErrorResponse)?.data?.message);
      } else {
        setNextStep(1);
      }
      setLoading(false);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} py={2}>
        <Grid item xs={12} md={6}>
          <FormLabel>First Name</FormLabel>
          <TextField
            fullWidth
            size="small"
            name="first_name"
            placeholder="Name"
            onChange={handleChange}
            error={touched.first_name && Boolean(errors.first_name)}
            helperText={errors.first_name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormLabel>Last Name</FormLabel>
          <TextField
            fullWidth
            size="small"
            name="last_name"
            placeholder="Name"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel>Email</FormLabel>{' '}
          <TextField
            fullWidth
            size="small"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel>User name</FormLabel>{' '}
          <TextField
            fullWidth
            size="small"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            error={touched.username && Boolean(errors.username)}
            helperText={errors.username}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel>Country</FormLabel>
          <TextField
            fullWidth
            size="small"
            name="country"
            placeholder="Country"
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={loading || isSendingOTP}
        loadingIndicator="Sending OTP..."
      >
        Send OTP
      </LoadingButton>
    </form>
  );
};
