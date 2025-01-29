'use client';
import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Alert, Grid, Paper, Typography } from '@mui/material';

import { useChangePasswordMutation } from 'src/redux/features/auth/auth-api';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { CustomPasswordInput } from 'src/components/form-components/custom-password-field';
import { CustomFormLabel } from 'src/components/form-components/form-label';
import { formConstants } from 'src/constants/form-constants';
import { IErrorResponse } from 'src/redux/interfaces/common';
import { paths } from 'src/routes/paths';
import * as Yup from 'yup';
import { Content } from 'src/layouts/auth-split';

const validationSchema = Yup.object().shape({
  old_password: Yup.string().required(formConstants.required),
  new_password: Yup.string().required(formConstants.required),
});

const defaultOtp = {
  old_password: '',
  new_password: '',
};

interface IProps {
  setErrorMsg: (value: string) => void;
}
export const ResetPasswordView = () => {
  const [resetPassword, { isLoading: isSendingOTP }] = useChangePasswordMutation();
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const router = useRouter();

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
      const res = await resetPassword({
        old_password: values.old_password,
        new_password: values.new_password,
      });
      if (res?.error) {
        setErrorMsg((res?.error as IErrorResponse)?.data?.message);
      } else {
        router.push(paths.auth.sign_in);
      }
      setLoading(false);
    },
  });

  return (
    <Content layoutQuery="xl">
      <Paper elevation={3} sx={{ p: 3, maxWidth: 540, mx: 'auto' }}>
        <Typography variant="h5">Reset Password</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} py={2}>
            {!!errorMsg && (
              <Alert severity="error" sx={{ my: 3 }}>
                {errorMsg}
              </Alert>
            )}
            <Grid item xs={12}>
              <CustomFormLabel value={'Old Password'} />
              <CustomPasswordInput
                id="old_password"
                name="old_password"
                placeholder="Enter Password"
                value={values.old_password}
                onChange={handleChange}
                error={touched.old_password && Boolean(errors.old_password)}
                helperText={errors.old_password}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormLabel value={'New Password'} />
              <CustomPasswordInput
                id="new_password"
                name="new_password"
                placeholder="New Password"
                value={values.new_password}
                onChange={handleChange}
                error={touched.new_password && Boolean(errors.new_password)}
                helperText={errors.new_password}
              />
            </Grid>
          </Grid>

          <LoadingButton
            fullWidth
            color="primary"
            size="medium"
            type="submit"
            variant="contained"
            loading={loading}
            loadingIndicator="Submitting..."
          >
            Submit
          </LoadingButton>
        </form>
      </Paper>
    </Content>
  );
};
