import { create } from 'zustand';
import { CadastroState } from '../types/types';

export const useRegisterStore = create<CadastroState>((set) => ({
  fullName: localStorage.getItem('fullName') || '',
  email: localStorage.getItem('email') || '',
  password: localStorage.getItem('password') || '',
  repeatPassword: localStorage.getItem('repeatPassword') || '',
  imgUser: localStorage.getItem('imgUser') || '',
  isUserLogin: localStorage.getItem('isUserLogin') === 'true' || false,

  setFullName: (value) => {
    localStorage.setItem('fullName', value);
    set({ fullName: value });
  },
  setEmail: (value) => {
    localStorage.setItem('email', value);
    set({ email: value });
  },
  setPassword: (value) => {
    localStorage.setItem('password', value);
    set({ password: value });
  },
  setRepeatPassword: (value) => {
    localStorage.setItem('repeatPassword', value);
    set({ repeatPassword: value });
  },
  setImgUser: (value) => {
    localStorage.setItem('imgUser', value);
    set({ imgUser: value });
  },

  setIsUserLogin: (value) => {
    localStorage.setItem('isUserLogin', value.toString());
    set({ isUserLogin: value });
  },
}));
