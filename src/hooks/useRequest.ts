import {
  createManager,
  deleteManger,
  getManger,
  updateManger,
} from "../manager/requests";

const useRequest = () => {
  // get all books

  const getAllBooks = async (url: string) => {
    return await getManger(url);
  };

  const createBooks = async (
    url: string,
    data: { name: string; author: string }
  ) => {
    return await createManager(url, data);
  };

  const updateBooks = async (
    url: string,
    data: { name?: string; author?: string }
  ) => {
    return await updateManger(url, data);
  };

  const deleteBook = async (url: string) => {
    return await deleteManger(url);
  };

  return { getAllBooks, deleteBook, updateBooks, createBooks };
};
export default useRequest;
