import Typography from '@mui/material/Typography';

export const ErrorText = ({ error }: { error: any  }) => {
  if (!error) return null;

  return (
    <Typography color="error" variant="body2">
      {error}
    </Typography>
  );
};
