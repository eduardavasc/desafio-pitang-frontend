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
import { useCustomModal } from "../../contexts/ModalContext";

const CustomModal = () => {
  const { isModalOpen, modalContent, closeModal } = useCustomModal();

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} isCentered size="lg">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(5px) hue-rotate(90deg)"
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

export default CustomModal;
