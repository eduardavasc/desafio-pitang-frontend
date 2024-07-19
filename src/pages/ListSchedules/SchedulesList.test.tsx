import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import * as ScheduleContext from "../../contexts/ScheduleContext";
import * as FormModalContext from "../../contexts/FormModalContext";
import * as InfoModalContext from "../../contexts/InfoModalContext";
import { Schedule } from "../../types/Schedule";
import SchedulesList from "./SchedulesList";
import dayjs from "dayjs";
import userEvent from "@testing-library/user-event";
import axios from "axios"
jest.mock('axios')

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

const schedules: ScheduleContext.GroupedSchedule[] = [
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

describe("<ScheduleList />", () => {
  beforeEach(() => {
    jest.spyOn(ScheduleContext, "useSchedule").mockReturnValue({
      schedules,
      getSchedules: jest.fn().mockResolvedValue(schedules),
      excludedTimesList: [],
      editSchedule: jest.fn(),
      createSchedule: jest.fn(),
    });
    jest.spyOn(FormModalContext, "useFormModal").mockReturnValue({
      isFormModalOpen: false,
      schedule: {} as Schedule,
      openFormModal: jest.fn(),
      closeModal: jest.fn(),
    });
    jest.spyOn(InfoModalContext, "useInfoModal").mockReturnValue({
      isInfoModalOpen: false,
      modalContent: {
        title: "",
        message: "",
      },
      openInfoModal: jest.fn(),
      closeModal: jest.fn(),
    });
  });

  it("should render the heading Lista de Agendamentos after finished loading", async () => {
    render(<SchedulesList />);
    await waitForElementToBeRemoved(() => screen.getByTestId("loadingSpinner"));
    const title = screen.getByRole("heading", {
      name: /Lista de Agendamentos/i,
    });
    expect(title).toBeInTheDocument();
  });

  it("should render the schedules table after loading", async () => {
    render(<SchedulesList />);
    await waitFor(() =>
      screen.getByRole("heading", { name: /Lista de Agendamentos/i })
    );

    expect(screen.getAllByText("John Doe")).toHaveLength(2);
    expect(screen.getAllByText("Jane Doe")).toHaveLength(2);
    expect(screen.getAllByText("Concluído")).toHaveLength(2);
    expect(screen.getAllByText("Não concluído")).toHaveLength(2);
  });

  it("should show error modal if fetching schedules fails", async () => {
    jest.spyOn(ScheduleContext, "useSchedule").mockReturnValue({
      schedules: [],
      excludedTimesList: [],
      getSchedules: jest.fn().mockRejectedValue(new Error("Erro ao carregar")),
      editSchedule: jest.fn(),
      createSchedule: jest.fn(),
    });

    const openInfoModal = jest.fn();
    jest.spyOn(InfoModalContext, "useInfoModal").mockReturnValue({
      isInfoModalOpen: false,
      modalContent: {
        title: "",
        message: "",
      },
      openInfoModal,
      closeModal: jest.fn(),
    });

    render(<SchedulesList />);
    await waitFor(() => expect(openInfoModal).toHaveBeenCalled());
  });

  it("should call openFormModal function when the edit button is clicked", async () => {
    const openFormModal = jest.fn();

    jest.spyOn(FormModalContext, "useFormModal").mockReturnValue({
      isFormModalOpen: false,
      schedule: schedules[0].schedules[0],
      openFormModal,
      closeModal: jest.fn(),
    });
    render(
      <FormModalContext.FormModalProvider>
        <SchedulesList />
      </FormModalContext.FormModalProvider>
    );
    await waitFor(() =>
      screen.getByRole("heading", { name: /Lista de Agendamentos/i })
    );

    const editButton = screen.getByTestId("editScheduleButton00");
    await userEvent.click(editButton);
    expect(openFormModal).toHaveBeenCalled();
  });

  it("should show the FormModal", async () => {
    const openFormModal = jest.fn();

    jest.spyOn(FormModalContext, "useFormModal").mockReturnValue({
      isFormModalOpen: true,
      schedule: schedules[0].schedules[0],
      openFormModal,
      closeModal: jest.fn(),
    });

    render(
      <FormModalContext.FormModalProvider>
        <SchedulesList />
      </FormModalContext.FormModalProvider>
    );
    await waitFor(() =>
      screen.getByRole("heading", { name: /Lista de Agendamentos/i })
    );

    expect(screen.getByTestId("formModalContent")).toBeInTheDocument();
    expect(screen.getByTestId("formModalHeader")).toBeInTheDocument();
    expect(screen.getByTestId("formTextInput")).toBeInTheDocument();
  });
});
