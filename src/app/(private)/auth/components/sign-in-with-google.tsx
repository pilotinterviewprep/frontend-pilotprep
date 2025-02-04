import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Iconify } from 'src/components/iconify';
import { signInWithGoogle } from 'src/firebase/firebase-auth-provider';
import { useSocialLoginMutation } from 'src/redux/features/auth/auth-api';
import { IErrorResponse } from 'src/redux/interfaces/common';
import { paths } from 'src/routes/paths';

export const SigninWithGoogleButton = () => {
  const [errorMsg, setErrorMsg] = React.useState('');
  const router = useRouter();
  const [socialLogin, { isLoading, error, data, isSuccess }] = useSocialLoginMutation();
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
    } catch (error) {
      console.error('Error during sign in with Google:', error);
      throw error;
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      router.push(paths.dashboard.root);
    }
  }, [isSuccess]);
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
