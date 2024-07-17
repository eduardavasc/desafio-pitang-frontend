import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import FormModal from "../../components/FormModal";
import { useFormModal } from "../../contexts/FormModalContext";
import { useSchedule } from "../../contexts/ScheduleContext";
import { GroupedSchedule } from "../../contexts/ScheduleContext";
import { Schedule } from "../../types/Schedule";

const ScheduleList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isModalOpen, openModal } = useFormModal();
  const { schedules, getSchedules } = useSchedule();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        await getSchedules();
      } catch (err) {
        setError("Erro ao carregar agendamentos.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const handleClick = (schedule: Schedule) => {
    openModal(schedule);
  };

  const sortedSchedules = schedules.sort((a, b) => {
    const dateA = dayjs(`${a.date} ${a.time}`);
    const dateB = dayjs(`${b.date} ${b.time}`);
    return dateA.diff(dateB);
  });

  if (loading) {
    return (
      <Flex width="full" align="center" justifyContent="center" p={5}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex width="full" align="center" justifyContent="center" p={5}>
        <Heading>{error}</Heading>
      </Flex>
    );
  }

  return (
    <Flex width="full" align="center" justifyContent="center" p={5}>
      {isModalOpen && <FormModal />}
      <Box w="full" maxW="1200px">
        <Box textAlign="center" mb={6}>
          <Heading>Lista de Agendamentos</Heading>
        </Box>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          bg="gray.100"
        >
          {sortedSchedules.map((groupedSchedule: GroupedSchedule) => (
            <Box key={groupedSchedule.date + groupedSchedule.time} mb={8}>
              <Heading bg="gray.400" size="md">
                {dayjs(groupedSchedule.date).format("DD/MM/YYYY")} -{" "}
                {dayjs(
                  `${groupedSchedule.date} ${groupedSchedule.time}`
                ).format("HH:mm")}
              </Heading>
              <Table variant="simple">
                <Thead bg="gray.200">
                  <Tr>
                    <Th>Nome Completo do Paciente</Th>
                    <Th>Data de Nascimento</Th>
                    <Th>Status do Agendamento</Th>
                    <Th>Conclusão de Agendamento</Th>
                    <Th>#</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {groupedSchedule.schedules.map((schedule) => (
                    <Tr key={schedule.id}>
                      <Td>{schedule.patientName}</Td>
                      <Td>
                        {dayjs(schedule.patientBirthDate).format("DD/MM/YYYY")}
                      </Td>
                      <Td>
                        {schedule.scheduleCompleted
                          ? "Concluído"
                          : "Não concluído"}
                      </Td>
                      <Td>
                        {schedule.scheduleConclusion
                          ? schedule.scheduleConclusion
                          : "-"}
                      </Td>
                      <Td>
                        <Button onClick={() => handleClick(schedule)}>
                          Editar
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};

export default ScheduleList;
