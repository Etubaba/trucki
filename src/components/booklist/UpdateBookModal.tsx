import { useState } from "react";
import { UpdateBookType } from "../../types";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import useRequest from "../../hooks/useRequest";
import { BASE_URL } from "../../constant/api";

const UpdateBookModal = ({
  isOpen,
  onClose,
  book,
  refetch,
}: UpdateBookType) => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const toast = useToast();
  const { updateBooks } = useRequest();

  const onUpdate = async () => {
    try {
      const input = {
        name: bookName === "" || bookName === book?.name ? undefined : bookName,
        author: author === "" || author === book?.author ? undefined : author,
      };

      await updateBooks(`${BASE_URL}books/${book.id}`, input);

      // toast success notification on success
      toast({
        title: `${book?.name} Updated .`,
        description: `You updated  ${book?.name} successfully.`,
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      // refetch
      refetch();
      onClose();
    } catch (err) {
      toast({
        title: `Something went wrong`,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="w-[16rem] md:w-[18rem] p-4 h-auto">
        <ModalHeader>Update Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Book name</FormLabel>
            <Input
              onChange={(e) => setBookName(e.target.value)}
              defaultValue={book?.name}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Author</FormLabel>
            <Input
              defaultValue={book?.author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={onUpdate}
            color="#003D29"
            colorScheme="#003D29"
            variant="outline"
            size={"sm"}
          >
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateBookModal;
