import React from 'react';
import useLoginModalStore from '@/shared/stores/useLoginModalStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog/dialog';
import { Button } from '@/shared/ui/Button/Button';

const LoginModal: React.FC = () => {
  const { isOpen, close, onSuccess, onCancel } = useLoginModalStore();

  const handleLogin = () => {
    // 로그인 로직은 여기에 구현
    console.log('로그인 시도');
    if (onSuccess) {
      onSuccess();
    }
    close();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-center text-xl font-bold'>로그인이 필요합니다</DialogTitle>
          <DialogDescription className='text-center text-gray-600'>
            이 기능을 사용하려면 로그인이 필요합니다. 계속하시겠습니까?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <Button onClick={handleCancel} variant='light' className='w-full sm:w-auto'>
            취소
          </Button>
          <Button onClick={handleLogin} className='w-full sm:w-auto'>
            로그인하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
