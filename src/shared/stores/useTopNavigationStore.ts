import { create } from 'zustand';

interface StoreProps {
  // 상태
  text: string;
  onClick: (() => void) | null;

  // 액션
  setText: (text: string) => void;
  setOnClick: (callback: (() => void) | null) => void;
  clearOnClick: () => void; // cleanup 함수 추가
}

const useTopNavigationStore = create<StoreProps>(set => ({
  text: '',
  onClick: null,
  setText: (text: string) => set({ text }),
  setOnClick: (callback: (() => void) | null) => set({ onClick: callback }),
  clearOnClick: () => set({ onClick: null }),
}));

export default useTopNavigationStore;
