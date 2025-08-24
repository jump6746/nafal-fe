import { useTopNavigationStore } from '@/shared/stores';
import { Link, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import useUserInfo from '@/entities/user/hooks/useUserInfo';

export interface TopNavigationProps {
  type: 'logo' | 'text';
  title?: string;
}

const TopNavigation = ({ type, title }: TopNavigationProps) => {
  const navigate = useNavigate();
  const onClick = useTopNavigationStore(state => state.onClick);
  const { userInfo } = useUserInfo();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <nav className='flex w-full items-center justify-between px-5'>
      <div className='flex h-12 w-fit items-center justify-center'>
        {type === 'text' && (
          <img
            src='/images/Icons/caret_left_lg.svg'
            alt='back'
            onClick={onClick || handleBack}
            className='cursor-pointer'
          />
        )}
      </div>
      <div className='absolute left-1/2 -translate-x-1/2 transform'>
        {type === 'text' ? (
          <h1 className='text-title-16 font-semibold'>{title}</h1>
        ) : (
          <img src='/images/LOGO/LOGO_Monogram.svg' alt='Logo' />
        )}
      </div>
      {userInfo ? (
        <div className='flex h-12 flex-row items-center gap-8'>
          <img src='/images/Icons/bell.svg' alt='alert' className='h-6 w-6' />
          {type === 'text' ? (
            <Link to='/'>
              <img src='/images/Icons/home.svg' alt='home' className='h-6 w-6' />
            </Link>
          ) : (
            <Link to='/mypage'>
              <img src='/images/Icons/user.svg' alt='mypage' className='h-6 w-6' />
            </Link>
          )}
        </div>
      ) : (
        <div className='flex h-12 w-fit flex-row items-center gap-8'>
          <Link to='/login' className='flex items-center gap-1 text-sm font-semibold'>
            <Lock className='h-3 w-3 text-black' />
            로그인
          </Link>
          {type === 'text' && (
            <Link to='/'>
              <img src='/images/Icons/home.svg' alt='home' className='h-6 w-6' />
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default TopNavigation;
