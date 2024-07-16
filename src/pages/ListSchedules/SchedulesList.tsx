import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { api } from "../../services/api";
import dayjs from "dayjs";
import { Schedule } from "../../types/Schedule";
import { useFormModal } from "../../contexts/FormModalContext";
import FormModal from "../../components/FormModal";

const ScheduleList: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isModalOpen, openModal } = useFormModal();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await api.get("/schedules");
        setSchedules(response.data);
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
          <Table variant="simple">
            <Thead bg="gray.200">
              <Tr>
                <Th>Nome Completo do Paciente</Th>
                <Th>Data de Nascimento</Th>
                <Th>Data do Agendamento</Th>
                <Th>Status do Agendamento</Th>
                <Th>Conclusão de Agendamento</Th>
                <Th>#</Th>
              </Tr>
            </Thead>
            <Tbody>
              {schedules.map((schedule) => (
                <Tr key={schedule.id}>
                  <Td>{schedule.patientName}</Td>
                  <Td>
                    {dayjs(schedule.patientBirthDate).format("DD/MM/YYYY")}
                  </Td>
                  <Td>
                    {dayjs(schedule.scheduledDate).format("DD/MM/YYYY HH:mm")}
                  </Td>
                  <Td>
                    {schedule.scheduleCompleted ? "Concluído" : "Não concluído"}
                  </Td>
                  <Td>
                    {schedule.scheduleConclusion
                      ? schedule.scheduleConclusion
                      : ""}
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
      </Box>
    </Flex>
  );
};

export default ScheduleList;
