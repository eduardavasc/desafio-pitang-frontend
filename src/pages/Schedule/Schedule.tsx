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

const Schedule = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
  });

  const onSubmit = (values: unknown) => {
    alert(JSON.stringify(values));
  };
  
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Faça seu agendamento:</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              // control={control}
              register={register}
              errors={errors}
              label="Nome completo: "
              name="patient-name"
            />
            <CustomDateInput
              name="data-de-nascimento"
              label="Data De Nascimento:"
              dateFormat="dd/MM/yyyy"
              control={control}
              errors={errors}
              withPortal
              showYearDropdown
            />
            <CustomDateInput
              name="data-agendamento"
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
            <Button width="full" mt={8} type="submit">
              Agendar
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
export default Schedule;
