import { createContext, ReactNode, useContext, useState } from "react";

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContent {
  title: string;
  message: string;
}

interface ModalContextData {
  isModalOpen: boolean;
  modalContent: ModalContent;
  openModal: (content: ModalContent) => void;
  closeModal: () => void;
}

const ModalContext = createContext({
  isModalOpen: false,
  modalContent: {
    title: "",
    message: "",
  },
  openModal: () => {},
  closeModal: () => {},
} as ModalContextData);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalContent>({
    title: "",
    message: "",
  });

  const openModal = (content: ModalContent) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent({
      title: "",
      message: "",
    });
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, modalContent, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useCustomModal = () => useContext(ModalContext);
