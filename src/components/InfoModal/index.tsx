import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useInfoModal } from "../../contexts/InfoModalContext";

const InfoModal = () => {
  const { isModalOpen, modalContent, closeModal } = useInfoModal();

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} isCentered size="lg">
        <ModalOverlay
          bg="blackAlpha.300"
        />
        <ModalContent>
          <ModalHeader>{modalContent.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{modalContent.message}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InfoModal;