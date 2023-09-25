import axios from "axios";

const instance = axios.create({
  baseURL: "/",
  headers: {
    accept: "application/json",
  },
});

export const getQuizes = async () => {
  const res = await instance.get(`quizes`);
  return res.data;
};
export default instance;
