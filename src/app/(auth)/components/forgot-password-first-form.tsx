import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';

import { useForgotPasswordMutation, useSendOTPMutation } from 'src/redux/features/auth/auth-api';

import { useFormik } from 'formik';
import { CustomTextField } from 'src/components/form-components/custom-text-field';
import { CustomFormLabel } from 'src/components/form-components/form-label';
import { formConstants } from 'src/constants/form-constants';
import { IErrorResponse } from 'src/redux/interfaces/common';
import * as Yup from 'yup';
import { defaultUser } from '../utils/auth.types';

const validationSchema = Yup.object().shape({
  email: Yup.string().email(formConstants.invalidEmail).required(formConstants.required),
});

const defaultFormValue = {
  email: '',
};

interface IProps {
  setEmail: (value: string) => void;
  setErrorMsg: (value: string) => void;
}
export const ForgotPasswordFirstForm = ({ setEmail, setErrorMsg }: IProps) => {
  const [sendForgotPasswordOTP, { isLoading: isSendingOTP }] = useForgotPasswordMutation();
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
    initialValues: defaultFormValue,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await sendForgotPasswordOTP(values);
      if (res?.error) {
        setErrorMsg((res?.error as IErrorResponse)?.data?.message);
      } else {
        setEmail(values.email);
      }
      setLoading(false);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} py={2}>
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
