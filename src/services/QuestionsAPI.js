import axios from "axios";

const QuestionsAPI = {
  getQuestions: (data, callback) => {
    axios
      .post(import.meta.env.VITE_SERVER_URL + `/questions`, data)
      .then((response) => {
        console.log("aaa");
        const questions = response.data;
        callback(true, questions);
      })
      .catch((error) => {
        callback(
          false,
          error && error.response && error.response.data
            ? error.response.data
            : error
        );
      });
  },
};
export default QuestionsAPI;
