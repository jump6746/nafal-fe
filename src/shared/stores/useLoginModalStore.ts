import { create } from 'zustand';

interface LoginModalState {
  isOpen: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface LoginModalActions {
  open: (options?: { onSuccess?: () => void; onCancel?: () => void }) => void;
  close: () => void;
  reset: () => void;
}

type LoginModalStore = LoginModalState & LoginModalActions;

const useLoginModalStore = create<LoginModalStore>(set => ({
  // 초기 상태
  isOpen: false,
  onSuccess: undefined,
  onCancel: undefined,

  // 액션
  open: (options = {}) =>
    set({
      isOpen: true,
      onSuccess: options.onSuccess,
      onCancel: options.onCancel,
    }),

  close: () =>
    set({
      isOpen: false,
    }),

  reset: () =>
    set({
      isOpen: false,
      onSuccess: undefined,
      onCancel: undefined,
    }),
}));

export default useLoginModalStore;
