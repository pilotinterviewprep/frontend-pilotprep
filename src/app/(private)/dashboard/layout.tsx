import { AuthGuard } from 'src/app/(private)/(auth)/guard';
import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';


// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
