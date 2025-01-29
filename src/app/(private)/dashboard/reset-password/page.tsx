import { CONFIG } from 'src/config-global';
import { ResetPasswordView } from './reset-password-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Reset password | ${CONFIG.appName}` };

export default function Page() {
  return <ResetPasswordView />;
}
