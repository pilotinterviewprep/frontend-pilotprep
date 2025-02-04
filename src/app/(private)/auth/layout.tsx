import { AuthSplitLayout } from 'src/layouts/auth-split';
import { GuestGuard } from './guard';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthSplitLayout>{children}</AuthSplitLayout>
    </GuestGuard>
  );
}
