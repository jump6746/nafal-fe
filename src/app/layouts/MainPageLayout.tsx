import { Layout, TopNavigation } from '@/shared/ui';

const MainPageLayout = () => {
  return (
    <Layout
      headerSlot={
        <div className='bg-point-300'>
          <TopNavigation type='logo' />
        </div>
      }
    />
  );
};

export default MainPageLayout;
