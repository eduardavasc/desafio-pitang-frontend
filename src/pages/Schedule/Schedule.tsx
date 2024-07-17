import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomModal from "../../components/InfoModal";
import CustomDateInput from "../../components/Inputs/CustomDateInput";
import TextInput from "../../components/Inputs/TextInput";
import { useInfoModal } from "../../contexts/InfoModalContext";
import { useSchedule } from "../../contexts/ScheduleContext";
import {
  filterPassedTime,
  maxTime,
  minDate,
  minTime,
} from "../../utils/dateUtils";
import { ScheduleFormValues, scheduleSchema } from "./schema";

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
  const { createSchedule } = useSchedule();

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
        message: error.response?.data?.message || "Verifique sua conexão e tente novamente.",
      });
    }
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
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
            />
            <CustomDateInput
              name="patientBirthDate"
              label="Data De Nascimento:"
              dateFormat="dd/MM/yyyy"
              control={control}
              errors={errors}
              withPortal
              showYearDropdown
            />
            <CustomDateInput
              name="scheduledDate"
              label="Data De Agendamento:"
              dateFormat="dd/MM/yyyy hh:ss aa"
              control={control}
              errors={errors}
              withPortal
              showTimeSelect
              timeIntervals={60}
              minDate={minDate}
              minTime={minTime}
              maxTime={maxTime}
              filterTime={filterPassedTime}
            />
            <Button width="full" mt={8} type="submit" isLoading={isLoading}>
              Agendar
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
export default Schedule;
