import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BookType } from "../../types";
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
// import { useMutation } from "@apollo/client";
// import { DELETE_BOOK_MUTATION } from "../../graphql/mutations";
import UpdateBookModal from "./UpdateBookModal";
import { TbBook2 } from "react-icons/tb";
import useRequest from "../../hooks/useRequest";

const BookTable = ({
  books,
  refetch,
}: {
  books: BookType[];
  refetch: () => void;
}) => {
  const [bookId, setBookId] = useState<null | number>(null);
  const [selected, setSelected] = useState<null | BookType>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: update,
    onClose: closeUpdate,
    onOpen: onOpenUpdate,
  } = useDisclosure();

  const { deleteBook } = useRequest();

  //   const [deleteBook, {}] = useMutation(DELETE_BOOK_MUTATION);

  const toast = useToast();

  const onDelete = async () => {
    try {
      const { data } = await deleteBook("");
      refetch();
      onClose();
      toast({
        title: `${data.removeBook.name} Deleted.`,
        description: `${data.removeBook.name} has been deleted successfully.`,
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: `Something went wrong.`,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      {/* table starts here */}

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {["Book ID", "Name", "Author", "Actions"].map((item, idx) => (
                <th key={idx} scope="col" className="px-6 py-3">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {books.map((item: BookType, idx: number) => (
              <tr key={idx} className="bg-white cursor-pointer border-b  ">
                <th
                  scope="row"
                  className="px-4 py-4 font-medium  whitespace-nowrap "
                >
                  {item.id}
                </th>
                <td className="px-6 py-4">{item.name}</td>

                <td className="px-6 py-4">{item.author}</td>

                <td align="left">
                  <span className="flex ml-3 space-x-3 justify-start">
                    <button
                      onClick={() => {
                        onOpenUpdate();
                        setSelected(item);
                      }}
                      className="bg-blue-700 border flex space-x-2 hover:bg-blue-700/40   rounded-md p-1"
                    >
                      <CiEdit className="text-white" />
                    </button>

                    <button
                      onClick={() => {
                        setBookId(item.id);
                        onOpen();
                      }}
                      className="bg-red-700 border flex space-x-2 hover:bg-red-700/40   rounded-md p-1"
                    >
                      <RiDeleteBin6Line className="text-white" />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* delete modal start here  */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="w-[16rem] md:w-[18rem] p-4 h-auto">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <MdErrorOutline className="text-red-600 text-5xl" />
            <p className="text-lg font-semibold text-title  mt-2">
              Delete Book
            </p>
            <p className="text-sm  text-textcolor  mt-2">
              You are about to delete this book.
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <Button
              color="#003D29"
              colorScheme="#003D29"
              onClick={onClose}
              variant="outline"
              size={"sm"}
            >
              Cancel
            </Button>

            <div className="max-w-[12rem]">
              <Button
                // onClick={onDelete}
                size={"sm"}
                color="red"
                colorScheme="red"
                variant="outline"
              >
                Delete
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>

      {/* update book modal   */}
      <UpdateBookModal
        book={selected as BookType}
        refetch={refetch}
        onClose={closeUpdate}
        isOpen={update}
      />
    </div>
  );
};

export default BookTable;
