import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useFormModal } from "../../contexts/FormModalContext";
import { useSchedule } from "../../contexts/ScheduleContext";
import TextInput from "../Inputs/TextInput";

export interface EditScheduleFormValues {
  scheduleCompleted: boolean;
  scheduleConclusion?: string | null;
}

const FormModal = () => {
  const { isModalOpen, schedule, closeModal } = useFormModal();
  const { editSchedule } = useSchedule();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      scheduleCompleted: schedule.scheduleCompleted,
      scheduleConclusion: schedule.scheduleConclusion,
    },
  });

  const onSubmit = async (data: EditScheduleFormValues) => {
    try {
      await editSchedule({ scheduleId: schedule.id, values: data });
      closeModal();
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error(error.response.data.message);
      } else {
        console.error("Falha ao atualizar o agendamento!");
      }
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} isCentered size="lg">
        <ModalOverlay bg="blackAlpha.300" />
        <ModalContent>
          <ModalHeader>ID do Agendamento: {schedule.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="scheduleCompleted" mb={4}>
                <FormLabel>Status do Agendamento</FormLabel>
                <Select {...register("scheduleCompleted", { required: true })}>
                  <option value="true">Concluído</option>
                  <option value="false">Não Concluído</option>
                </Select>
              </FormControl>
              <TextInput
                register={register}
                errors={errors}
                label="Conclusão do agendamento: "
                name="scheduleConclusion"
              />

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  OK
                </Button>
                <Button variant="ghost" onClick={closeModal}>
                  Cancelar
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormModal;
