import axios from "axios";
import router from "@/router";

// аксиос клиент
export const api = axios.create({
  baseURL: "https://inv.misthntism.space/api/",
});

// перехват запросов
api.interceptors.response.use(
  // обработка успешных запросов
  function (responce) {
    const data = responce.data;
    if (data.response?.notify) {
      return Promise.reject({ error: data.response.notify, responce });
    }
    // отдача успешного запроса
    return data;
  },

  // Обработка ошибок
  function (error) {
    // Истечение Bearer-токена
    if ([403, 401].includes(error?.response?.status)) {
      router.push({ name: "auth.logout" });
    } else if (error.response?.status === 422) {
      // Валидация данных
      const { data } = error.response;
      return Promise.reject(data); // Откидываем ошибку
    }

    // Откидываем ошибку
    return Promise.reject(error);
  }
);
