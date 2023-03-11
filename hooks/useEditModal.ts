import {create} from 'zustand';

interface UseEditModal { 
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const UseEditModal = create<UseEditModal>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),
}));

export default UseEditModal;