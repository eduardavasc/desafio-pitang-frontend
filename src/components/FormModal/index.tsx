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
import { useFormModal } from "../../contexts/FormModalContext";
import { useForm } from "react-hook-form";
import TextInput from "../Inputs/TextInput";
import { api } from "../../services/api";
import { AxiosError } from "axios";

interface IFormData {
  scheduleCompleted: boolean;
  scheduleConclusion?: string | null;
}

const FormModal = () => {
  const { isModalOpen, schedule, closeModal } = useFormModal();

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

  const onSubmit = async (data: IFormData) => {
    try {
      await api.patch(`/schedule/${schedule.id}`, {
        scheduleCompleted:
          data.scheduleCompleted.toString() === "true" ? true : false,
        scheduleConclusion: data.scheduleConclusion,
      });
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
