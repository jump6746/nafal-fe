import { Layout, TopNavigation, LoginModal } from '@/shared/ui';

const MainPageLayout = () => {
  return (
    <Layout
      headerSlot={
        <div className='bg-point-300'>
          <TopNavigation type='logo' />
        </div>
      }
      modalSlot={<LoginModal />}
    />
  );
};

export default MainPageLayout;
