import { Link } from 'react-router-dom';

export interface TopNavigationProps {
  type: 'logo' | 'text';
  title?: string;
}

const TopNavigation = ({ type, title }: TopNavigationProps) => {
  return (
    <nav className='flex w-full items-center justify-between'>
      <div className='flex h-12 w-12 items-center justify-center'>
        {type === 'text' && <img src='images/Icons/caret_left_lg.svg' alt='back' />}
      </div>
      <div>
        {' '}
        {type === 'text' ? (
          <h1 className='text-title-16 font-semibold'>{title}</h1>
        ) : (
          <img src='images/LOGO/LOGO_Monogram.svg' alt='Logo' />
        )}
      </div>
      <div className='flex h-12 w-12 items-center justify-center'>
        {type === 'text' ? (
          <Link to='/'>
            <img src='images/Icons/home.svg' alt='home' />
          </Link>
        ) : (
          <Link to='/mypage'>
            <img src='images/Icons/user.svg' alt='mypage' />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default TopNavigation;
