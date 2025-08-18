import { Outlet } from 'react-router-dom';

interface Props {
  headerSlot?: React.ReactNode;
  navbarSlot?: React.ReactNode;
  modalSlot?: React.ReactNode;
}

const Layout = (props: Props) => {
  return (
    <div
      className='relative mx-auto flex h-full max-w-[450px] min-w-[320px] flex-col overflow-hidden bg-lime-100 px-5'
      id='topLayout'
    >
      {props.headerSlot}
      <main className='flex-grow overflow-auto bg-amber-100'>
        <Outlet />
      </main>
      {props.navbarSlot}
      {props.modalSlot}
    </div>
  );
};

export default Layout;
