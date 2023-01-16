import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { api } from "@/utils/api";
import { ApiResponse } from "@/interfaces/api.interface";
import { Status } from "@/stores/items/types";

export default function getStatused() {
  const statusList = ref<Array<Status>>([]);
  const toast = useToast();
  const fetching = async () => {
    statusList.value = await api.get<ApiResponse, Array<Status>>("status");
  };
  onMounted(fetching);

  return {
    statusList,
  };
}
