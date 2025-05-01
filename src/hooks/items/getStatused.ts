import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { api } from "@/utils/api";
import { ApiResponse } from "@/interfaces/api.interface";
import { Status } from "@/stores/items/types";
import { sleep, statuses } from "@/mocks";

export default function getStatused() {
  const statusList = ref<Array<Status>>([]);
  const toast = useToast();
  const fetching = async () => {
    await sleep(250);
    statusList.value = statuses;
  };
  onMounted(fetching);

  return {
    statusList,
  };
}
