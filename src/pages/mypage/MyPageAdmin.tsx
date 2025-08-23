import { useTopNavigationStore } from '@/shared/stores';
import { Button } from '@/shared/ui';
import { useEffect } from 'react';

const MyPageAdmin = () => {
  const setText = useTopNavigationStore(state => state.setText);

  useEffect(() => {
    setText('마이페이지');
  }, []);

  return (
    <div className='flex h-full w-full flex-col'>
      <section className='gradient-bg relative flex aspect-[75/34] w-full flex-col justify-end overflow-hidden px-5 py-5.5'>
        <span className='text-xl font-semibold'>어서오세요</span>
        <div className='flex items-center gap-2 text-xl font-semibold'>
          <span>{'김유저'}님</span>
          <button>
            <img src='/images/Icons/pencil.svg' alt='수정' />
          </button>
        </div>
        {/* 해당 부분 프로필 사진 img 태그로 변경 */}
        <div className='gradient-border absolute -top-4 right-4 h-35 w-35 rounded-full' />
      </section>
      <section className='flex w-full flex-1 flex-col gap-4.5 overflow-auto px-5 pt-4.5'>
        <h3 className='text-xl font-extrabold text-gray-800'>어드민 계정 목록</h3>
        <ul className='flex flex-col gap-4 overflow-auto'>
          <li className='flex items-center justify-between'>
            <span className='text-lg font-semibold text-gray-800'>{'iddididididididname'}</span>
            <Button variant={'warning'} className='text-sub-a-600 px-4.5 py-2.5 font-medium'>
              삭제
            </Button>
          </li>
        </ul>
      </section>
      <div className='w-full bg-white/20 px-5 py-8'>
        <Button variant={'default'} className='w-full'>
          어드민 계정 생성하기
        </Button>
      </div>
    </div>
  );
};

export default MyPageAdmin;
