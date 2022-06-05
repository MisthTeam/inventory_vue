import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { api } from "@/utils/api";

export default function getStatused() {
  const statusList = ref(null);
  const toast = useToast();
  const fetching = async () => {
    try {
      statusList.value = await api.get("status");
    } catch (error) {
      console.error(error);
      toast.error("Случилась ошибка при получении статусов");
    }
  };
  onMounted(fetching);

  return {
    statusList,
  };
}
