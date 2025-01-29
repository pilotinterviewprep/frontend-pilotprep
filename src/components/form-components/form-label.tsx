import { FormLabel } from '@mui/material';
export const CustomFormLabel = ({ value }: { value: string }) => {
  return <FormLabel sx={{ color: 'text.secondary' }}>{value}</FormLabel>;
};
