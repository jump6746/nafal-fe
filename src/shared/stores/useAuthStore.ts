import { create } from 'zustand';

interface Props {
  token: string | null;
  setToken: (token: string) => void;
}

const useAuthStore = create<Props>(set => ({
  token: sessionStorage.getItem('nafal-access'),
  setToken: (token: string) => {
    sessionStorage.setItem('nafal-access', token);
    set({ token });
  },
}));

export default useAuthStore;
