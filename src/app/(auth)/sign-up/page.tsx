import { CONFIG } from 'src/config-global';

import { SignUpView } from 'src/app/(auth)/view/sign-up-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign up - ${CONFIG.appName}` };

export default function Page() {
  return <SignUpView />;
}
