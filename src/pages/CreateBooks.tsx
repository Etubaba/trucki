import {
  Button,
  Textarea,
  Input,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useRequest from "../hooks/useRequest";

const CreateBook = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [isError, setIsError] = useState(false);

  const { createBooks } = useRequest();

  // const [mutate, {}] = useMutation(CREATE_BOOK_MUTATION);
  const toast = useToast();

  const onCreate = async () => {
    const isInValid = validateForm();
    if (isInValid) return;
    try {
      const input = {
        name: bookName,
        author,
      };

      const { data } = await createBooks("", input);

      // toast success notification on success
      toast({
        title: `${data.createBook.name} Created.`,
        description: `You created a book successfully.`,
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      // reset form
      setAuthor("");
      setBookName("");
    } catch (err) {
      toast({
        title: `Something went wrong`,

        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  //validate form input
  function validateForm() {
    if (author === "" || bookName === "") {
      setIsError(true);
      return true;
    }
    return false;
  }

  return (
    <div>
      <div className="flex md:flex-row mb-10  md:space-y-0 justify-between items-center">
        <p className="text-lg text-title   tracking-wide font-semibold">
          Create book
        </p>
        <Link to={"/profile"}>
          <Button
            color="#003D29"
            colorScheme="#003D29"
            variant="outline"
            size={"sm"}
          >
            Book List
          </Button>
        </Link>
      </div>

      <div className="md:mt-10 mt-8 w-full  bg-white border  shadow-sm rounded-md p-3 md:p-6">
        <div className=" bg-[#FBFBFF]  rounded-md mb-4 md:h-auto p-3 md:p-6">
          <p className="text-sm  text-text mb-7">Enter Book Details</p>
          <FormControl isInvalid={isError}>
            <div className="w-full ">
              <div className=" w-full mb-6">
                <Input
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                  placeholder={"Book name"}
                />
              </div>
              <div className=" w-full mb-6">
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder={"Author"}
                />
              </div>
            </div>

            <div className="md:flex mb-12 mt-6 w-full md:justify-end">
              <Button
                onClick={onCreate}
                color="#003D29"
                colorScheme="#003D29"
                size={"sm"}
                variant={"outline"}
              >
                Create
              </Button>
            </div>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
