import { CONFIG } from 'src/config-global';

import { SignInView } from 'src/auth/view/sign-in-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return <SignInView />;
}
