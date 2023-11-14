import axios from "axios";
import { BASE_URL } from "../constant/api";

export async function createManager(
  url: string,
  data: { name: string; author: string }
) {
  return await axios.post(url, data);
}

export async function updateManger(
  url: string,
  data: { name?: string; author?: string }
) {
  return await axios.put(url, data);
}

export async function getManger(url: string) {
  return await axios.get(url);
}
export async function deleteManger(url: string) {
  return await axios.delete(url);
}

export const getAllBooks = async () => {
  const { data } = await getManger(`${BASE_URL}books`);
  return data.data;
};
