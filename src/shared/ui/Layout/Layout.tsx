import { Outlet } from 'react-router-dom';
import { Toaster } from '@/shared/ui';

interface Props {
  headerSlot?: React.ReactNode;
  navbarSlot?: React.ReactNode;
  modalSlot?: React.ReactNode;
}

const Layout = (props: Props) => {
  return (
    <div
      className='relative mx-auto flex h-full max-w-[450px] min-w-[320px] flex-col overflow-hidden shadow'
      id='topLayout'
    >
      {props.headerSlot}
      <main className='relative flex-grow overflow-auto'>
        <Outlet />
      </main>
      {props.navbarSlot}
      {props.modalSlot}
      <Toaster />
    </div>
  );
};

export default Layout;
