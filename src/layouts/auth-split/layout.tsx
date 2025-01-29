'use client';

import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import { Logo } from 'src/components/logo';

import { Typography } from '@mui/material';
import { SettingsButton } from '../components/settings-button';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { Content, Main } from './main';
import { AuthFooter } from 'src/app/(auth)/components/auth-footer';

// ----------------------------------------------------------------------

export type AuthSplitLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  section?: {
    title?: string;
    imgUrl?: string;
    subtitle?: string;
  };
};

export function AuthSplitLayout({ sx, section, children, header }: AuthSplitLayoutProps) {
  const layoutQuery: Breakpoint = 'md';

  return (
    <LayoutSection
      headerSection={
        /** **************************************
         * Header
         *************************************** */
        <HeaderSection
          disableElevation
          layoutQuery={layoutQuery}
          slotProps={{ container: { maxWidth: false } }}
          sx={{ position: { [layoutQuery]: 'fixed' }, ...header?.sx }}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                {/* -- Logo -- */}
                <Logo />
              </>
            ),
            rightArea: (
              <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
                {/* -- Help link -- */}
                <Link
                  href={paths.faqs}
                  component={RouterLink}
                  color="inherit"
                  sx={{ typography: 'subtitle2' }}
                >
                  Need help?
                </Link>
                {/* -- Settings button -- */}
                <SettingsButton />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={<AuthFooter />}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{ '--layout-auth-content-width': '420px' }}
      sx={sx}
    >
      <Main layoutQuery={layoutQuery}>
        <Content layoutQuery={layoutQuery}>{children}</Content>
      </Main>
    </LayoutSection>
  );
}
