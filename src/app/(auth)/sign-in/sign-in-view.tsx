'use client';
import React from 'react';

import { LoadingButton } from '@mui/lab';
import { FormLabel, Grid, Link, Paper, Stack, TextField, Typography } from '@mui/material';

import { useLoginMutation } from 'src/redux/features/auth/auth-api';

import { useFormik } from 'formik';
import { formConstants } from 'src/constants/form-constants';
import { IErrorResponse } from 'src/redux/interfaces/common';
import * as Yup from 'yup';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useRouter } from 'next/navigation';
import { ErrorText } from 'src/components/form-components/error-text';
import { CustomTextField } from 'src/components/form-components/custom-text-field';
import { CustomPasswordInput } from 'src/components/form-components/custom-password-field';

const validationSchema = Yup.object().shape({
  email: Yup.string().email(formConstants.invalidEmail).required(formConstants.required),
  password: Yup.string().required(formConstants.required),
});

const defaultFormValue = {
  email: '',
  password: '',
};

export const SignInView = () => {
  const [login, { isLoading: isLoginLoading, isSuccess }] = useLoginMutation();
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
    initialValues: defaultFormValue,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await login(values);
      if (res?.error) {
        setErrorMsg((res?.error as IErrorResponse)?.data?.message);
      } else {
        router.push(paths.dashboard.root);
      }
      setLoading(false);
    },
  });

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Stack direction={'row'} justifyContent="space-between" alignItems="center" spacing={3}>
        <Typography variant="h5">Sign In</Typography>
        <Stack direction={'row'}>
          <Typography sx={{ fontSize: 14, color: 'text.secondary', mr: 1 }}>
            Don't hanve account?
          </Typography>
          <Link component={RouterLink} href={paths.auth.sign_up} sx={{ fontSize: 14, mr: 1 }}>
            Sign up
          </Link>
        </Stack>
      </Stack>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} py={2}>
          <Grid item xs={12}>
            <FormLabel>Email</FormLabel>
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
            <FormLabel>Password</FormLabel>
            <CustomPasswordInput
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={errors.password}
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
    </Paper>
  );
};
