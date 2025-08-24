import { Layout, LoginModal } from '@/shared/ui';

const DefaultLayout = () => {
  return <Layout modalSlot={<LoginModal />} />;
};

export default DefaultLayout;
