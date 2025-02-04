import React from 'react';

import { LoadingButton } from '@mui/lab';
import { FormLabel, Grid } from '@mui/material';

import { useRegisterMutation } from 'src/redux/features/auth/auth-api';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { CustomPasswordInput } from 'src/components/form-components/custom-password-field';
import { CustomTextField } from 'src/components/form-components/custom-text-field';
import { formConstants } from 'src/constants/form-constants';
import { IErrorResponse } from 'src/redux/interfaces/common';
import { paths } from 'src/routes/paths';
import * as Yup from 'yup';
import { CustomFormLabel } from 'src/components/form-components/form-label';

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
      const res = await register({
        otp: values.otp,
        password: values.password,
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
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} py={2}>
        <Grid item xs={12}>
          <CustomFormLabel value={values.otp} />
          <CustomTextField
            id="otp"
            name="otp"
            type="number"
            placeholder="Enter OTP"
            value={values.otp}
            onChange={handleChange}
            error={touched.otp && Boolean(errors.otp)}
            helperText={errors.otp}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomFormLabel value={'Password'} />
          <CustomPasswordInput
            id="password"
            name="password"
            placeholder="Enter Password"
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomFormLabel value={'Confirm Password'} />
          <CustomPasswordInput
            id="confirm_password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={values.confirm_password}
            onChange={handleChange}
            error={touched.confirm_password && Boolean(errors.confirm_password)}
            helperText={errors.confirm_password}
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
  );
};
