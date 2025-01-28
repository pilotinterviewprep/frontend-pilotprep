import type { IErrorResponse } from 'src/redux/interfaces/common';

import React from 'react';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useSendOTPMutation } from 'src/redux/features/auth/auth-api';

import { Form, Field } from 'src/components/hook-form';
import { schemaHelper } from 'src/components/hook-form/schema-helper';

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export const SignUpSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  contact_number: schemaHelper.phoneNumber({ isValidPhoneNumber }),
});

type Props = {
  setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
};

const SignUpFirstForm = ({ setNextStep, setErrorMsg }: Props) => {
  const [sendOTP, { isLoading: isSendingOTP }] = useSendOTPMutation();

  const defaultValues = {
    name: '',
    email: '',
    contact_number: '',
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
      const res = await sendOTP(data);
      if (res?.error) {
        setErrorMsg((res?.error as IErrorResponse)?.data?.message);
      } else {
        setNextStep(true);
      }
    } catch (err) {
      setErrorMsg(typeof err === 'string' ? err : err.message);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box gap={3} display="flex" flexDirection="column">
        <Field.Text name="name" label="Name" InputLabelProps={{ shrink: true }} />
        <Field.Text name="email" label="Email address" InputLabelProps={{ shrink: true }} />
        <Field.Phone name="contact_number" label="Phone number" />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting || isSendingOTP}
          loadingIndicator="Sending OTP..."
        >
          Send OTP
        </LoadingButton>
      </Box>
    </Form>
  );
};

export default SignUpFirstForm;
