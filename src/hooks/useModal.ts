import { useState, useCallback } from "react";

interface ModalState {
  isOpen: boolean;
}

interface ModalActions {
  openModal: () => void;
  closeModal: () => void;
}

const useModal = (): ModalState & ModalActions => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, openModal, closeModal };
};

export default useModal;
