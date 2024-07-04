import { create } from 'zustand';

type Store = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCartOpen = create<Store>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
