import 'src/global.css';

// ----------------------------------------------------------------------

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import ReduxProvider from 'src/providers/redux-provider';
import { schemeConfig } from 'src/theme/scheme-config';
import { ThemeProvider } from 'src/theme/theme-provider';

import { MotionLazy } from 'src/components/animate/motion-lazy';
import { ProgressBar } from 'src/components/progress-bar';
import { defaultSettings, SettingsDrawer, SettingsProvider } from 'src/components/settings';
import { AuthProvider } from 'src/contexts/jwt';

// import { AuthProvider } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export const PrivateLayout = ({ children }: Props) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript
          defaultMode={schemeConfig.defaultMode}
          modeStorageKey={schemeConfig.modeStorageKey}
        />

        <ReduxProvider>
          <AuthProvider>
            <SettingsProvider settings={defaultSettings}>
              <ThemeProvider>
                <MotionLazy>
                  <ProgressBar />
                  <SettingsDrawer />
                  {children}
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};
