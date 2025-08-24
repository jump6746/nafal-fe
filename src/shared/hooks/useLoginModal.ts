import useLoginModalStore from '@/shared/stores/useLoginModalStore';

export const useLoginModal = () => {
  const { open, close, isOpen } = useLoginModalStore();

  const showLoginModal = (options?: { onSuccess?: () => void; onCancel?: () => void }) => {
    open(options);
  };

  const hideLoginModal = () => {
    close();
  };

  return {
    showLoginModal,
    hideLoginModal,
    isOpen,
  };
};
