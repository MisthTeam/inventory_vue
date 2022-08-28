import axios, { AxiosResponse } from "axios";
import router from "@/router";
import { useToast } from "vue-toastification";
import { ApiResponse, ApiResponseNotifyError, ApiResponseNotifySuccess } from "@/interfaces/api.interface";
import nProgress from "nprogress";

// аксиос клиент
export const api = axios.create({
  baseURL: "http://in.netrack.ru/api/",
  headers: {
    Accept: "application/json",
  },
});

localStorage.getItem("Authorization") &&
  (api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("Authorization")}`);

api.interceptors.request.use((config) => {
  nProgress.start();
  return config;
});

const toast = useToast();

// перехват запросов
api.interceptors.response.use(
  // обработка успешных запросов
  function (response: AxiosResponse<any, ApiResponse>): Promise<ApiResponse> {
    nProgress.done();

    const data = response.data;

    const notifyResponse = data?.response?.notify as ApiResponseNotifyError | ApiResponseNotifySuccess;
    notifyResponse && toast[notifyResponse.type](notifyResponse.content);
    // if (data.response?.notify?.type === "error") {
    //   return Promise.reject({ error: data.response.notify, response });
    // }

    // отдача успешного запроса
    return data.response;
  },

  // Обработка ошибок
  function (error) {
    nProgress.done();
    // Истечение Bearer-токена
    const { data } = error.response;

    switch (error?.response?.status) {
      case 401:
        router.push({ name: "auth.logout" });
        break;

      case 403:
        toast.warning("Попробуйте позже");
        break;

      case 422:
        for (const key in data.errors) toast.error(data.errors[key][0]);
        break;

      case 400:
        toast.error(data.error);
        break;

      default:
        toast.error("Произошла ошибка. Попробуйте позже");
        break;
    }

    // Откидываем ошибку
    return Promise.reject(error);
  },
);
