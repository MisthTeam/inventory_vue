import { onMounted, ref } from "vue";
import { api } from "@/utils/api";
import { useToast } from "vue-toastification";
import { ApiResponse } from "@/interfaces/api.interface";

export default function getAttributes() {
  const isLoading = ref(true);
  const attributes = ref(null);
  const toast = useToast();
  const fetching = async () => {
    try {
      const { data } = await api.get<ApiResponse>("attr");
      attributes.value = data.response;
    } catch (error) {
      toast.error("Произошла ошибка при получении данных. Попробуйте позже");
      import.meta.env.DEV && console.error(error);
    }
    isLoading.value = false;
  };

  onMounted(fetching);

  return {
    attributes,
    isLoading,
  };
}
