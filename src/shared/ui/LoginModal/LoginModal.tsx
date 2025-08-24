import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useLoginModalStore from '@/shared/stores/useLoginModalStore';
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog/dialog';
import { Button } from '@/shared/ui/Button/Button';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const LoginModal: React.FC = () => {
  const { isOpen, close, onSuccess, onCancel } = useLoginModalStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    if (onSuccess) {
      onSuccess();
    }
    close();
    // 현재 위치를 state로 전달하여 로그인 후 다시 돌아올 수 있도록 함
    navigate('/login', { state: { from: location.pathname + location.search } });
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogPortal>
        <DialogOverlay className='z-[10001] bg-black/50' />
        <DialogPrimitive.Content className='fixed top-[50%] left-[50%] z-[10002] grid w-full max-w-[420px] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-white p-6 shadow-lg duration-200'>
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
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default LoginModal;
