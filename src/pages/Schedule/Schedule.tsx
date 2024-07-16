import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomModal from "../../components/InfoModal";
import CustomDateInput from "../../components/Inputs/CustomDateInput";
import TextInput from "../../components/Inputs/TextInput";
import { useInfoModal } from "../../contexts/InfoModalContext";
import { api } from "../../services/api";
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
  const { openModal, isModalOpen } = useInfoModal();

  const onSubmit = async (values: ScheduleFormValues) => {
    const response = await api.post("/schedule", values);
    if (response.status === 201) {
      openModal({
        title: "Sucesso!",
        message: "Agendamento feito com sucesso!",
      });
    } else {
      alert("Erro ao criar agendamento!");
    }
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      {isModalOpen && <CustomModal />}
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
