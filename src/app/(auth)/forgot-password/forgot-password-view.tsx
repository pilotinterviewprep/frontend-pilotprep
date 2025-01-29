'use client';

import React from 'react';

import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import { Paper, Stack, Typography } from '@mui/material';
import { ForgotPasswordFirstForm } from '../components/forgot-password-first-form';
import { ForgotPasswordSecondForm } from '../components/forgot-password-second-form';

// ----------------------------------------------------------------------

export function ForgotPasswordView() {
  const [email, setEmail] = React.useState<string | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Stack direction={'row'} justifyContent="space-between" alignItems="center" spacing={3}>
        <Typography variant="h5">Forgot Password</Typography>
        <Stack direction={'row'}>
          <Typography sx={{ fontSize: 14, color: 'text.secondary', mr: 1 }}>
            Remember password?
          </Typography>
          <Link component={RouterLink} href={paths.auth.sign_in} sx={{ fontSize: 14, mr: 1 }}>
            Sign in
          </Link>
        </Stack>
      </Stack>

      {!!errorMsg && (
        <Alert severity="error" sx={{ my: 3 }}>
          {errorMsg}
        </Alert>
      )}
      {email !== null ? (
        <ForgotPasswordSecondForm email={email} setErrorMsg={setErrorMsg} />
      ) : (
        <ForgotPasswordFirstForm setEmail={setEmail} setErrorMsg={setErrorMsg} />
      )}
    </Paper>
  );
}
