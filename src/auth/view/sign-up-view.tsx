'use client';

import { useState } from 'react';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { FormHead } from '../components/form-head';
import SignUpFirstForm from './components/sign-up-first-form';
import SignUpSecondForm from './components/sign-up-second-form';

// ----------------------------------------------------------------------

export function SignUpView() {
  const [nextStep, setNextStep] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <>
      <FormHead
        title="Create your account"
        description={
          !nextStep ? (
            <>
              {`Already have an account? `}
              <Link component={RouterLink} href={paths.auth.sign_in} variant="subtitle2">
                Sign in
              </Link>
            </>
          ) : (
            <>Send OTP to your email</>
          )
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      {nextStep ? (
        <SignUpSecondForm setNextStep={setNextStep} setErrorMsg={setErrorMsg} />
      ) : (
        <SignUpFirstForm setNextStep={setNextStep} setErrorMsg={setErrorMsg} />
      )}
    </>
  );
}
