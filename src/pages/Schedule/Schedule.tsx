import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomDateInput from "../../components/Inputs/CustomDateInput";
import TextInput from "../../components/Inputs/TextInput";
import {
  filterPassedTime,
  maxTime,
  minDate,
  minTime,
} from "../../utils/dateUtils";
import { ScheduleFormValues, scheduleSchema } from "./schema";
import { api } from "../../services/api";
import { useState } from "react";
import CustomModal from "../../components/CustomModal";

const Schedule = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  const onSubmit = async (values: ScheduleFormValues) => {
    console.log("oiiii")
    const response = await api.post("/schedule", values);
    console.log(response.data)
    if (response.status === 201) {
      setShowModal(true);
    } else {
      alert("Erro ao criar agendamento!");
    }
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      {showModal && (
        <CustomModal
          isOpen={showModal}
          message="Agendamento criado com sucesso!"
          onClose={() => setShowModal(false)}
          title="Woohooo!!"
        />
      )}
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
