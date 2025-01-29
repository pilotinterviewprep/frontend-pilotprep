import React from 'react';

import { LoadingButton } from '@mui/lab';
import { FormLabel, Grid, TextField } from '@mui/material';

import { useRegisterMutation, useSendOTPMutation } from 'src/redux/features/auth/auth-api';

import { useFormik } from 'formik';
import { formConstants } from 'src/constants/form-constants';
import { IErrorResponse } from 'src/redux/interfaces/common';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  otp: Yup.number().required(formConstants.required),
  password: Yup.string().required(formConstants.required),
  confirm_password: Yup.string().required(formConstants.required),
});

const defaultOtp = {
  otp: '',
  password: '',
  confirm_password: '',
};

interface IProps {
  setErrorMsg: (value: string) => void;
}
export const SignupSecondForm = ({ setErrorMsg }: IProps) => {
  const [register, { isLoading: isSendingOTP }] = useRegisterMutation();
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
    initialValues: defaultOtp,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await register({
        otp: values.otp,
        password: values.password,
      });
      if (res?.error) {
        setErrorMsg((res?.error as IErrorResponse)?.data?.message);
      } else {
      }
      setLoading(false);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} py={2}>
        <Grid item xs={12} md={6}>
          <FormLabel>OTP </FormLabel>
          <TextField
            fullWidth
            size="small"
            name="otp"
            type="number" 
            placeholder="OTP"
            onChange={handleChange}
            error={touched.otp && Boolean(errors.otp)}
            helperText={errors.otp}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormLabel>Password </FormLabel>
          <TextField
            fullWidth
            size="small"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={errors.password}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormLabel>Confirm Password </FormLabel>
          <TextField
            fullWidth
            size="small"
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={handleChange}
            error={touched.confirm_password && Boolean(errors.confirm_password)}
            helperText={errors.confirm_password}
          />
        </Grid>
      </Grid>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={loading}
        loadingIndicator="Submitting..."
      >
        Submit
      </LoadingButton>
    </form>
  );
};
