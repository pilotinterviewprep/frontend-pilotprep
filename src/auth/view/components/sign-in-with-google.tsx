import { Button } from '@mui/material';
import React from 'react';
import { Iconify } from 'src/components/iconify';
import { signInWithGoogle } from 'src/firebase/firebase-auth-provider';
import { useSocialLoginMutation } from 'src/redux/features/auth/auth-api';
import { IErrorResponse } from 'src/redux/interfaces/common';

export const SigninWithGoogleButton = () => {
  const [errorMsg, setErrorMsg] = React.useState('');
  const [socialLogin, { isLoading, error, data }] = useSocialLoginMutation();
  const handleGoogleSignIn = async () => {
    try {
      const result: any = await signInWithGoogle();

      const userData = {
        name: result.displayName,
        email: result.email,
        profile_pic: result.photoURL,
        contact_number: result.phoneNumber,
        provider: 'GOOGLE',
      };

      const res = await socialLogin(userData);

      if (res?.error) {
        setErrorMsg((res?.error as IErrorResponse)?.data?.message);
      }

      console.log(userData, 'result from sign in with google');
    } catch (error) {
      console.error('Error during sign in with Google:', error);
      throw error;
    }
  };
  return (
    <Button
      endIcon={<Iconify icon="logos:google-icon" />}
      variant="outlined"
      onClick={handleGoogleSignIn}
      fullWidth
      sx={{
        py: 1.5,
        color: 'text.secondary',
      }}
    >
      Sign-in with Google
    </Button>
  );
};
