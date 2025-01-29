import React from 'react';

import { LoadingButton } from '@mui/lab';
import { FormLabel, Grid, TextField } from '@mui/material';

import { useSendOTPMutation } from 'src/redux/features/auth/auth-api';

import { useFormik } from 'formik';
import { CustomTextField } from 'src/components/form-components/custom-text-field';
import { ErrorText } from 'src/components/form-components/error-text';
import { formConstants } from 'src/constants/form-constants';
import { IErrorResponse } from 'src/redux/interfaces/common';
import * as Yup from 'yup';
import { defaultUser } from '../utils/auth.types';
import { CustomFormLabel } from 'src/components/form-components/form-label';

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
          <CustomFormLabel value="First Name" />
          <CustomTextField
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
            error={touched.first_name && Boolean(errors.first_name)}
            helperText={errors.first_name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel value="Last Name" />
          <CustomTextField name="last_name" placeholder="Last Name" onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <CustomFormLabel value="Email" />
          <CustomTextField
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomFormLabel value="User name" />

          <CustomTextField
            name="username"
            placeholder="Username"
            onChange={handleChange}
            error={touched.username && Boolean(errors.username)}
            helperText={errors.username}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomFormLabel value="Country" />
          <CustomTextField name="country" placeholder="Country" onChange={handleChange} />
        </Grid>
      </Grid>

      <LoadingButton
        fullWidth
        color="primary"
        size="medium"
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
