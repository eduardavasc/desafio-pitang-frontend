import { createContext, ReactNode, useContext, useState } from "react";

interface InfoModalProviderProps {
  children: ReactNode;
}

interface ModalContent {
  title: string;
  message: string;
}

interface InfoModalContextData {
  isInfoModalOpen: boolean;
  modalContent: ModalContent;
  openInfoModal: (content: ModalContent) => void;
  closeModal: () => void;
}

const InfoModalContext = createContext({
  isInfoModalOpen: false,
  modalContent: {
    title: "",
    message: "",
  },
  openInfoModal: () => {},
  closeModal: () => {},
} as InfoModalContextData);

export const InfoModalProvider = ({ children }: InfoModalProviderProps) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalContent>({
    title: "",
    message: "",
  });

  const openInfoModal = (content: ModalContent) => {
    setModalContent(content);
    setIsInfoModalOpen(true);
  };

  const closeModal = () => {
    setIsInfoModalOpen(false);
    setModalContent({
      title: "",
      message: "",
    });
  };

  return (
    <InfoModalContext.Provider
      value={{ isInfoModalOpen, modalContent, openInfoModal, closeModal }}
    >
      {children}
    </InfoModalContext.Provider>
  );
};

export const useInfoModal = () => useContext(InfoModalContext);
