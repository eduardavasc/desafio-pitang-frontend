import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomModal from "../../components/InfoModal";
import CustomDateInput from "../../components/Inputs/CustomDateInput";
import TextInput from "../../components/Inputs/TextInput";
import { useInfoModal } from "../../contexts/InfoModalContext";
import { useSchedule } from "../../contexts/ScheduleContext";
import { maxTime, minDate, minTime } from "../../utils/dateUtils";
import { ScheduleFormValues, scheduleSchema } from "./schema";
import { useEffect } from "react";

const Schedule = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
  });
  const { openInfoModal, isInfoModalOpen } = useInfoModal();
  const { createSchedule, getSchedules, excludedTimesList } = useSchedule();

  const onSubmit = async (values: ScheduleFormValues) => {
    try {
      const response = await createSchedule(values);
      if (response.status === 201) {
        openInfoModal({
          title: "Sucesso!",
          message: "Agendamento feito com sucesso!",
        });
      }
    } catch (error: any) {
      openInfoModal({
        title: "Algo deu errado!",
        message:
          error.response?.data?.message ||
          "Verifique sua conexão e tente novamente.",
      });
    }
  };
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        await getSchedules();
      } catch (err: any) {}
    };

    fetchSchedules();
  }, []);

  const filterPassedTime = (time: Date): boolean => {
    const currentDate = new Date();
    const selectedDate = time;
    let invalidTime = true;
    excludedTimesList.forEach((date) => {
      if (selectedDate.getTime() === date.getTime()) {
        invalidTime = false;
      }
    });
    if (currentDate.getTime() < selectedDate.getTime() && invalidTime) {
      return true;
    }

    return false;
  };

  return (
    <Flex flexDirection="column"
    
    height="100vh"
    justifyContent="center"
    alignItems="center">
      {isInfoModalOpen && <CustomModal />}
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Faça seu agendamento:</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              register={register}
              errors={errors}
              label="Nome completo: "
              name="patientName"
              data-testid="patientName"
            />
            <CustomDateInput
              name="patientBirthDate"
              label="Data De Nascimento:"
              dateFormat="dd/MM/yyyy"
              maxDate={new Date()}
              control={control}
              errors={errors}
              withPortal
              showYearDropdown
              testId="patientBirthDate"
            />
            <CustomDateInput
              name="scheduledDate"
              label="Data De Agendamento:"
              dateFormat="dd/MM/yyyy hh:mm aa"
              control={control}
              errors={errors}
              withPortal
              showTimeSelect
              timeIntervals={60}
              minDate={minDate}
              minTime={minTime}
              maxTime={maxTime}
              filterTime={filterPassedTime}
              testId="scheduledDate"
            />
            <Button bgColor={'gray.300'} width="full" mt={8} type="submit" isLoading={isLoading}>
              Agendar
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
export default Schedule;
