import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SignUpState {
  loginId: string;
  setLoginId: (newValue: string) => void;
  password: string;
  setPassword: (newValue: string) => void;
  nickname: string;
  setNickname: (newValue: string) => void;
  description: string;
  setDescription: (newValue: string) => void;
  role: string;
  setRole: (newValue: string) => void;
  reset: () => void;
}

const useSignUpStore = create<SignUpState>()(
  devtools((set) => ({
    loginId: '',
    setLoginId: (newValue: string) => set({ loginId: newValue }),
    password: '',
    setPassword: (newValue: string) => set({ password: newValue }),
    nickname: '',
    setNickname: (newValue: string) => set({ nickname: newValue }),
    description: '',
    setDescription: (newValue: string) => set({ description: newValue }),
    role: '',
    setRole: (newValue: string) => set({ role: newValue }),
    reset: () =>
      set({
        loginId: '',
        password: '',
        nickname: '',
        description: '',
        role: '',
      }),
  }))
);

export default useSignUpStore;
