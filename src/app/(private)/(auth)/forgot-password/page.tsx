import { CONFIG } from 'src/config-global';
import { ForgotPasswordView } from './forgot-password-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Forgot password | ${CONFIG.appName}` };

export default function Page() {
  return <ForgotPasswordView />;
}
