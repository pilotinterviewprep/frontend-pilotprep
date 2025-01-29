import { Box, Stack, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { paths } from 'src/routes/paths';

export const AuthFooter = () => {
  const authFooterMenuItem = [
    { title: 'Home', href: paths.root },
    { title: 'Privacy Policy', href: paths.privacy_policy },
    { title: 'Contact Us', href: paths.contact_us },
  ];

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      sx={{
        px: 4,
        py: 2,
        bgcolor: 'background.default',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Left Side - Copyright */}
      <Typography variant="body2" color="text.secondary">
        Copyright © {new Date().getFullYear()} । {' '}
        <MuiLink component={Link} href={paths.root} color="primary" underline="hover">
          Pilot Interview Prep.
        </MuiLink>{' '}
      </Typography>

      {/* Right Side - Footer Links */}
      <Stack direction="row" spacing={2} sx={{ mt: { xs: 1, sm: 0 } }}>
        {authFooterMenuItem.map((item) => (
          <MuiLink
            key={item.title}
            component={Link}
            href={item.href}
            color="text.primary"
            underline="hover"
            sx={{
              fontSize: 14,
              fontWeight: 500,
              '&:hover': { color: 'primary.main' },
            }}
          >
            {item.title}
          </MuiLink>
        ))}
      </Stack>
    </Stack>
  );
};
