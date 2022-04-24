import axios from "axios";

// аксиос клиент
export const api = axios.create({
  baseURl: "http://172.19.0.17/",
});

// перехват запросов
api.interceptors.response.use(
  // обработка успешных запросов
  function (responce) {
    const data = responce.data;
    if (data.error) {
      return Promise.reject({ message: data.error, response });
    }
    // отдача успешного запроса
    return data;
  }
);
