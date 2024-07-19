import { createContext, ReactNode, useContext, useState } from "react";
import { Schedule } from "../../types/Schedule";

interface FormModalProviderProps {
  children: ReactNode;
}

interface FormModalContextData {
  isFormModalOpen: boolean;
  schedule: Schedule;
  openFormModal: (content: Schedule) => void;
  closeModal: () => void;
}

const FormModalContext = createContext({
  isFormModalOpen: false,
  schedule: {} as Schedule,
  openFormModal: () => {},
  closeModal: () => {},
} as FormModalContextData);

export const FormModalProvider = ({ children }: FormModalProviderProps) => {
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<Schedule>({} as Schedule);

  const openFormModal = (sched: Schedule) => {
    setSchedule(sched);
    setIsFormModalOpen(true);
  };

  const closeModal = () => {
    setIsFormModalOpen(false);
    setSchedule({} as Schedule);
  };

  return (
    <FormModalContext.Provider
      value={{ isFormModalOpen, schedule, openFormModal, closeModal }}
    >
      {children}
    </FormModalContext.Provider>
  );
};

export const useFormModal = () => useContext(FormModalContext);
