import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Schedule from "./Schedule";
import * as ScheduleContext from "../../contexts/ScheduleContext";
import * as InfoModalContext from "../../contexts/InfoModalContext";
import { schedules } from "../../utils/mocksTest";

describe("<Schedule />", () => {
  beforeEach(() => {
    jest.spyOn(ScheduleContext, "useSchedule").mockReturnValue({
      schedules,
      getSchedules: jest.fn().mockResolvedValue(schedules),
      excludedTimesList: [],
      editSchedule: jest.fn(),
      createSchedule: jest.fn(),
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form inputs and button", async () => {
    render(<Schedule />);

    expect(screen.getByTestId("formTextInput")).toBeInTheDocument();
    expect(screen.getByTestId("patientBirthDate")).toBeInTheDocument();
    expect(screen.getByTestId("scheduledDate")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Agendar/i })
    ).toBeInTheDocument();
  });

  it.only("should call createSchedule on form submit with all filled values", async () => {
    const createSchedule = jest.fn();
    jest.spyOn(ScheduleContext, "useSchedule").mockReturnValue({
      schedules,
      getSchedules: jest.fn().mockResolvedValue(schedules),
      excludedTimesList: [],
      editSchedule: jest.fn(),
      createSchedule: createSchedule,
    });

    render(
      <ScheduleContext.ScheduleProvider>
        <Schedule />
      </ScheduleContext.ScheduleProvider>
    );

    await userEvent.type(screen.getByTestId("formTextInput"), "John Doe");
    fireEvent.change(screen.getByTestId("patientBirthDate"), {
      target: { value: "1990-01-01" },
    });
    fireEvent.change(screen.getByTestId("scheduledDate"), {
      target: { value: "2024-07-20 10:00 AM" },
    });

    await userEvent.click(screen.getByRole("button", { name: /Agendar/i }));

    expect(createSchedule).toHaveBeenCalled();
  });

  it("should not call createSchedule on form submit with incomplete values", async () => {
    const createSchedule = jest.fn();
    jest.spyOn(ScheduleContext, "useSchedule").mockReturnValue({
      schedules,
      getSchedules: jest.fn().mockResolvedValue(schedules),
      excludedTimesList: [],
      editSchedule: jest.fn(),
      createSchedule: createSchedule,
    });

    render(
      <ScheduleContext.ScheduleProvider>
        <Schedule />
      </ScheduleContext.ScheduleProvider>
    );

    await userEvent.type(screen.getByTestId("formTextInput"), "John Doe");
    fireEvent.change(screen.getByTestId("patientBirthDate"), {
      target: { value: "1990-01-01" },
    });

    await userEvent.click(screen.getByRole("button", { name: /Agendar/i }));

    expect(createSchedule).not.toHaveBeenCalled();
  });

  it("should render the calendar", async () => {
    render(<Schedule />);

    waitFor(() => fireEvent.click(screen.getByTestId("scheduledDate")));
    expect(
      screen.getByRole("heading", {
        name: /july 2024/i,
      })
    ).toBeInTheDocument();
  });
});
