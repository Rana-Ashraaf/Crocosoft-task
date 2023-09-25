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

export const createQuiz = async (quizData) => {
  const res = await instance.post(`quizes`, quizData);
  return res.data;
};

export const getQuizById = async (quizId) => {
  const res = await instance.get(`quizes/${quizId}`);
  return res.data;
};
export default instance;
