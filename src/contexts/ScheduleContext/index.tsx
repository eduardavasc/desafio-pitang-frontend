import { createContext, ReactNode, useContext, useState } from "react";
import { Schedule } from "../../types/Schedule";
import { api } from "../../services/api";
import { EditScheduleFormValues } from "../../components/FormModal";
import { ScheduleFormValues } from "../../pages/Schedule/schema";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";

interface ScheduleProviderProps {
  children: ReactNode;
}

interface ScheduleContextData {
  schedules: GroupedSchedule[];
  excludedTimesList: Date[];
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

export interface GroupedSchedule {
  date: string;
  time: string;
  schedules: Schedule[];
}

const ScheduleContext = createContext({
  schedules: [] as GroupedSchedule[],
  excludedTimesList: [] as Date[],
} as ScheduleContextData);

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [schedules, setSchedules] = useState<GroupedSchedule[]>([]);
  const [excludedTimesList, setExcludedTimesList] = useState<Date[]>([]);

  const getSchedules = async () => {
    const response = await api.get("/schedules");
    if (response.data) {
      const groupedSchedules = groupSchedulesByDateTime(response.data);
      const excludedTimes = getExcludedTimes(response.data);
      setSchedules(groupedSchedules);
      setExcludedTimesList(excludedTimes);
    }
  };

  const getExcludedTimes = (data: Schedule[]): Date[] => {
    const excludedTimes = [] as Date[];
    const dateCounts: { [key: string]: number } = {};

    data.forEach((sched) => {
      const dateKey = dayjs(sched.scheduledDate).format("YYYY-MM-DD HH:mm");
      if (dateCounts[dateKey]) {
        dateCounts[dateKey]++;
      } else {
        dateCounts[dateKey] = 1;
      }
    });

    for (const dateKey in dateCounts) {
      if (dateCounts[dateKey] === 2) {
        excludedTimes.push(new Date(dateKey));
      }
    }

    return excludedTimes;
  };

  const groupSchedulesByDateTime = (data: Schedule[]): GroupedSchedule[] => {
    const groupedSchedules: { [key: string]: GroupedSchedule } = {};

    data.forEach((schedule) => {
      const scheduledDate = new Date(schedule.scheduledDate);
      const dateKey = scheduledDate.toDateString();
      const timeKey =
        scheduledDate.getHours() + ":" + scheduledDate.getMinutes();

      const key = `${dateKey}-${timeKey}`;

      if (!groupedSchedules[key]) {
        groupedSchedules[key] = {
          date: dateKey,
          time: timeKey,
          schedules: [],
        };
      }

      groupedSchedules[key].schedules.push(schedule);
    });

    return Object.values(groupedSchedules);
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
      value={{
        schedules,
        getSchedules,
        editSchedule,
        createSchedule,
        excludedTimesList,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => useContext(ScheduleContext);
