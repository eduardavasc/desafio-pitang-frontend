import { createContext, ReactNode, useContext, useState } from "react";
import { Schedule } from "../../types/Schedule";

interface FormModalProviderProps {
  children: ReactNode;
}

interface FormModalContextData {
  isModalOpen: boolean;
  schedule: Schedule;
  openModal: (content: Schedule) => void;
  closeModal: () => void;
}

const FormModalContext = createContext({
  isModalOpen: false,
  schedule: {} as Schedule,
  openModal: () => {},
  closeModal: () => {},
} as FormModalContextData);

export const FormModalProvider = ({ children }: FormModalProviderProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<Schedule>({} as Schedule);

  const openModal = (sched: Schedule) => {
    setSchedule(sched);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSchedule({} as Schedule);
  };

  return (
    <FormModalContext.Provider
      value={{ isModalOpen, schedule, openModal, closeModal }}
    >
      {children}
    </FormModalContext.Provider>
  );
};

export const useFormModal = () => useContext(FormModalContext);
