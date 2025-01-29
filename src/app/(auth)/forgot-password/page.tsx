import { CONFIG } from 'src/config-global';
import { ForgotPasswordView } from './forgot-password-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | ${CONFIG.appName}` };

export default function Page() {
  return <ForgotPasswordView />;
}
