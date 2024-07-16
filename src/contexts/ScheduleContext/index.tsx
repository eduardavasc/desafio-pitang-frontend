import { createContext, ReactNode, useContext, useState } from "react";
import { Schedule } from "../../types/Schedule";
import { api } from "../../services/api";
import { EditScheduleFormValues } from "../../components/FormModal";
import { ScheduleFormValues } from "../../pages/Schedule/schema";
import { AxiosResponse } from "axios";

interface ScheduleProviderProps {
  children: ReactNode;
}

interface ScheduleContextData {
  schedules: Schedule[];
  getSchedules: () => Promise<void>;
  editSchedule: (data: EditScheduleProps) => Promise<AxiosResponse<any, any>>;
  createSchedule: (
    values: ScheduleFormValues
  ) => Promise<AxiosResponse<any, any>>;
}

interface EditScheduleProps {
  values: EditScheduleFormValues;
  scheduleId: string;
}

const ScheduleContext = createContext({
  schedules: [] as Schedule[],
} as ScheduleContextData);

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const getSchedules = async () => {
    const response = await api.get("/schedules");
    if (response.data) {
      setSchedules(response.data);
    }
  };

  const refreshSchedules = async () => {
    getSchedules();
  };

  const editSchedule = async (data: EditScheduleProps) => {
    const response = await api.patch(`/schedule/${data.scheduleId}`, {
      scheduleCompleted:
        data.values.scheduleCompleted.toString() === "true" ? true : false,
      scheduleConclusion: data.values.scheduleConclusion,
    });

    if (response.status === 201) {
      refreshSchedules();
      return response;
    }

    return response;
  };

  const createSchedule = async (values: ScheduleFormValues) => {
    const response = await api.post("/schedule", values);

    return response;
  };

  return (
    <ScheduleContext.Provider
      value={{ schedules, getSchedules, editSchedule, createSchedule }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => useContext(ScheduleContext);
