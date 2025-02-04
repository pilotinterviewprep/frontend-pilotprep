import { Alert, Button, Stack } from '@mui/material';
import { ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Iconify } from 'src/components/iconify';
import {
  signInWithApple,
  signInWithFacebook,
  signInWithGoogle,
} from 'src/firebase/firebase-auth-provider';
import { useSocialLoginMutation } from 'src/redux/features/auth/auth-api';
import { IErrorResponse } from 'src/redux/interfaces/common';
import { paths } from 'src/routes/paths';

export const SocialLogin = ({ displayErrorMsg }: { displayErrorMsg: (msg: string) => void }) => {
  const [errorMsg, setErrorMsg] = React.useState('');
  const router = useRouter();
  const [socialLogin, { isLoading, error, data, isSuccess }] = useSocialLoginMutation();

  const handleSocialSignIn = async (provider: 'GOOGLE' | 'FACEBOOK' | 'APPLE') => {
    try {
      let result: any;
      if (provider === 'GOOGLE') result = await signInWithGoogle();
      if (provider === 'FACEBOOK') result = await signInWithFacebook();
      if (provider === 'APPLE') result = await signInWithApple();

      const userData = {
        first_name: result.displayName,
        username: result.displayName.toLowerCase().replace(' ', '_'),
        email: result.email,
        profile_pic: result.photoURL,
        contact_number: result.phoneNumber,
        provider: provider,
      };

      const res = await socialLogin(userData);
      if (res?.error) {
        setErrorMsg((res?.error as IErrorResponse)?.data?.message);
      }
    } catch (e) {
      setErrorMsg((e as any).message);
    }
  };
{
  !! errorMsg && (
   displayErrorMsg(errorMsg)
  )
}

  React.useEffect(() => {
    if (isSuccess) {
      router.push(paths.dashboard.root);
    }
  }, [isSuccess]);
  return (
    <Stack spacing={2} direction={'row'}>

      <Button
        endIcon={<Iconify icon="logos:google-icon" />}
        variant="outlined"
        size="small"
        onClick={() => handleSocialSignIn('GOOGLE')}
        fullWidth
        sx={{
          py: 1.5,
          color: 'text.secondary',
          backgroundColor: 'grey.100',
          '&:hover': { backgroundColor: 'grey.200' },
          paddingY: 2.5,
        }}
      >
        Google
      </Button>
      <Button
        endIcon={<Iconify icon="logos:facebook" />}
        variant="outlined"
        size="small"
        onClick={() => handleSocialSignIn('FACEBOOK')}
        fullWidth
        sx={{
          py: 1.5,
          color: 'text.secondary',
          backgroundColor: 'grey.100',
          '&:hover': { backgroundColor: 'grey.200' },
          paddingY: 2.5,
        }}
      >
        Facebook
      </Button>
      <Button
        endIcon={<Iconify icon="logos:apple" />}
        variant="outlined"
        onClick={() => handleSocialSignIn('APPLE')}
        fullWidth
        size="small"
        sx={{
          py: 1.5,
          color: 'text.secondary',
          backgroundColor: 'grey.100',
          '&:hover': { backgroundColor: 'grey.200' },
          paddingY: 2.5,
        }}
      >
        Apple
      </Button>
    </Stack>
  );
};
