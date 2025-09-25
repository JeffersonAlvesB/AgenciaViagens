// store/usePacotesStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import dayjs from 'dayjs';
import { PacoteComprado, PacotesState } from '../types/types';

export const usePacotesStore = create<PacotesState>()(
  persist(
    (set) => ({
      pacotesComprados: [],

      adicionarPacote: (novoPacote) => {
        const pacoteComId: PacoteComprado = {
          ...novoPacote,
          id: `pacote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          dataCompra: dayjs().format('DD/MM/YYYY HH:mm'),
        };

        set((state) => ({
          pacotesComprados: [...state.pacotesComprados, pacoteComId],
        }));
      },
    }),
    {
      name: 'pacotes-storage',
    }
  )
);
