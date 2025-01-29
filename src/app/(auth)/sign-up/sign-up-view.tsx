'use client';

import React from 'react';

import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import { Paper, Stack, Typography } from '@mui/material';
import { SignUpFirstForm } from '../components/sign-up-first-form';
import { SignupSecondForm } from '../components/sign-up-second-form';

// ----------------------------------------------------------------------

export function SignUpView() {
  const [step, setStep] = React.useState<number>(0);
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      {step === 0 ? (
        <Stack direction={'row'} justifyContent="space-between" alignItems="center" spacing={3}>
          <Typography variant="h5">Sign Up</Typography>
          <Stack direction={'row'}>
            <Typography sx={{ fontSize: 14, color: 'text.secondary', mr: 1 }}>
              Already have an account?
            </Typography>
            <Link component={RouterLink} href={paths.auth.sign_in} sx={{ fontSize: 14, mr: 1 }}>
              Sign in
            </Link>
          </Stack>
        </Stack>
      ) : (
        <Stack direction={'row'} justifyContent="space-between" alignItems="center" spacing={3}>
          <Typography variant="h5">OTP</Typography>
          <Stack direction={'row'}>
            <Typography sx={{ fontSize: 14, color: 'text.secondary', mr: 1 }}>
              Already have an account?
            </Typography>
            <Link component={RouterLink} href={paths.auth.sign_in} sx={{ fontSize: 14, mr: 1 }}>
              Sign in
            </Link>
          </Stack>
        </Stack>
      )}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}
      {step === 1 ? (
        <SignupSecondForm setErrorMsg={setErrorMsg} />
      ) : (
        <SignUpFirstForm setNextStep={setStep} setErrorMsg={setErrorMsg} />
      )}
    </Paper>
  );
}
