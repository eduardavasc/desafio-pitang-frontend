import dayjs from "dayjs";
import { GroupedSchedule } from "../contexts/ScheduleContext";
import { Schedule } from "../types/Schedule";

const groupOneSchedules: Schedule[] = [
  {
    id: "1",
    patientName: "John Doe",
    patientBirthDate: new Date("1990-01-01"),
    scheduledDate: new Date("2024-07-20T10:00:00"),
    scheduleCompleted: false,
    scheduleConclusion: null,
  },
  {
    id: "2",
    patientName: "Jane Doe",
    patientBirthDate: new Date("1985-02-15"),
    scheduledDate: new Date("2024-07-21T11:00:00"),
    scheduleCompleted: true,
    scheduleConclusion: "Consultation",
  },
];

const groupTwoSchedules: Schedule[] = [
  {
    id: "3",
    patientName: "John Doe",
    patientBirthDate: new Date("1990-01-01"),
    scheduledDate: new Date("2024-07-23T10:00:00"),
    scheduleCompleted: false,
    scheduleConclusion: null,
  },
  {
    id: "4",
    patientName: "Jane Doe",
    patientBirthDate: new Date("1985-02-15"),
    scheduledDate: new Date("2024-07-23T11:00:00"),
    scheduleCompleted: true,
    scheduleConclusion: "Consultation",
  },
];

export const schedules: GroupedSchedule[] = [
  {
    date: dayjs(new Date("2024-07-22T11:00:00")).format("YYYY-MM-DD"),
    time: dayjs(new Date("2024-07-22T11:00:00")).format("HH:mm"),
    schedules: groupOneSchedules,
  },
  {
    date: dayjs(new Date("2024-07-23T11:00:00")).format("YYYY-MM-DD"),
    time: dayjs(new Date("2024-07-23T11:00:00")).format("HH:mm"),
    schedules: groupTwoSchedules,
  },
];
