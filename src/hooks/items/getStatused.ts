import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { api } from "@/utils/api";
import { ApiResponse } from "@/interfaces/api.interface";
import { Status } from "@/stores/items/types";

export default function getStatused() {
  const statusList = ref<Array<Status> | null>(null);
  const toast = useToast();
  const fetching = async () => {
    try {
      statusList.value = await api.get<ApiResponse, Array<Status>>("status");
    } catch (error) {
      import.meta.env.DEV && console.error(error);
      toast.error("Случилась ошибка при получении статусов");
    }
  };
  onMounted(fetching);

  return {
    statusList,
  };
}
