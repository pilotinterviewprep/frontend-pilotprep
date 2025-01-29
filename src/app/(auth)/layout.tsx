import 'src/global.css';

// ----------------------------------------------------------------------

import type { Viewport } from 'next';


import { CONFIG } from 'src/config-global';
import { primary } from 'src/theme/core/palette';


import { PrivateLayout } from 'src/layouts/private-layout';

// ----------------------------------------------------------------------

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primary.main,
};

export const metadata = {
  icons: [
    {
      rel: 'icon',
      url: `${CONFIG.assetsDir}/favicon.ico`,
    },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
