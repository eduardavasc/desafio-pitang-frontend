import { createContext, ReactNode, useContext, useState } from "react";

interface InfoModalProviderProps {
  children: ReactNode;
}

interface ModalContent {
  title: string;
  message: string;
}

interface InfoModalContextData {
  isModalOpen: boolean;
  modalContent: ModalContent;
  openModal: (content: ModalContent) => void;
  closeModal: () => void;
}

const InfoModalContext = createContext({
  isModalOpen: false,
  modalContent: {
    title: "",
    message: "",
  },
  openModal: () => {},
  closeModal: () => {},
} as InfoModalContextData);

export const InfoModalProvider = ({ children }: InfoModalProviderProps) => {
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
    <InfoModalContext.Provider
      value={{ isModalOpen, modalContent, openModal, closeModal }}
    >
      {children}
    </InfoModalContext.Provider>
  );
};

export const useInfoModal = () => useContext(InfoModalContext);
