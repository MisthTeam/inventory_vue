import axios, { AxiosResponse } from "axios";
import router from "@/router";
import { useToast } from "vue-toastification";
import { ApiResponse } from "@/interfaces/api.interface";
import nProgress from "nprogress";

// аксиос клиент
export const api = axios.create({
  baseURL: "https://inv.misthntism.space/api/",
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  nProgress.start();
  return config;
});

// перехват запросов
api.interceptors.response.use(
  // обработка успешных запросов
  function (response: AxiosResponse<any, ApiResponse>): Promise<ApiResponse> {
    nProgress.done();
    const data = response.data;
    if (data.response?.notify?.type === "error") {
      return Promise.reject({ error: data.response.notify, response });
    }

    // отдача успешного запроса
    return data.response;
  },

  // Обработка ошибок
  function (error) {
    nProgress.done();
    const toast = useToast();
    // Истечение Bearer-токена

    switch (error?.response?.status) {
      case 401:
        router.push({ name: "auth.logout" });
        break;

      case 403:
        router.push({ name: "auth.login" });
        toast.warning("Авторизуйтесь заново");
        break;

      case 422:
        const { data } = error.response;
        for (const key in data.errors) toast.error(data.errors[key][0]);
        break; // Откидываем ошибку

      default:
        break;
    }

    // Откидываем ошибку
    return Promise.reject(error);
  },
);
