import type { IErrorResponse } from 'src/redux/interfaces/common';

import React from 'react';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { useRegisterMutation } from 'src/redux/features/auth/auth-api';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export const SignUpSchema = zod.object({
  otp: zod.number({ required_error: 'OTP is required' }).min(6, { message: 'OTP is invalid' }),
  password: zod
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, {
      message: 'Password must contain at least one letter and one number',
    }),
});

type Props = {
  setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
};

const SignUpSecondForm = ({ setNextStep, setErrorMsg }: Props) => {
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const router = useRouter();

  const password = useBoolean();

  const defaultValues = {
    otp: 0,
    password: '',
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setErrorMsg('');
      const res = await register(data);
      if (res?.error) {
        setErrorMsg((res?.error as IErrorResponse)?.data?.message);
      } else {
        router.push('/sign-in');
      }
    } catch (err) {
      setErrorMsg(typeof err === 'string' ? err : err.message);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box gap={3} display="flex" flexDirection="column">
        <Field.Text name="otp" type="number" label="OTP" InputLabelProps={{ shrink: true }} />
        <Field.Text
          name="password"
          label="Password"
          placeholder="6+ characters"
          type={password.value ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting || isRegistering}
          loadingIndicator="Creating..."
        >
          Create Account
        </LoadingButton>
      </Box>
    </Form>
  );
};

export default SignUpSecondForm;
