import { create } from 'zustand';

interface StoreProps {
  // 상태
  text: string;

  // 액션
  setText: (text: string) => void;
}

const useTopNavigationStore = create<StoreProps>(set => ({
  text: '',
  setText: (text: string) => set({ text }),
}));

export default useTopNavigationStore;
