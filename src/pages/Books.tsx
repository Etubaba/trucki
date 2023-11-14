import { Button } from "@chakra-ui/react";
import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import BookTable from "../components/booklist/BookTable";

const Books = () => {
  const bookData = useLoaderData();
  return (
    <div>
      <div className="flex md:flex-row mb-10  md:space-y-0 justify-between items-center">
        <p className="text-lg text-title   tracking-wide font-semibold">
          Books
        </p>
        <Link to={"/create-book"}>
          <Button
            color="#003D29"
            colorScheme="#003D29"
            variant="outline"
            size={"sm"}
          >
            Create Book
          </Button>
        </Link>
      </div>
      {/* <BookTable refetch={refetch} books={books} /> */}
    </div>
  );
};

export default Books;
