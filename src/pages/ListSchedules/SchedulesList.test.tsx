import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as FormModalContext from "../../contexts/FormModalContext";
import * as InfoModalContext from "../../contexts/InfoModalContext";
import * as ScheduleContext from "../../contexts/ScheduleContext";
import { Schedule } from "../../types/Schedule";
import { schedules } from "../../utils/mocksTest";
import SchedulesList from "./SchedulesList";
jest.mock("axios");

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
