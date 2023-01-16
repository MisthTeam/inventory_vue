import { onMounted, shallowRef } from "vue";
import { useItemsStore } from "@/stores";
import { DashboardInfo } from "@/stores/items/types";

export default function getItemsInfo() {
  const isLoading = shallowRef(true);
  const dashInfo = shallowRef<DashboardInfo>({
    clear: 0,
    used: 0,
    danger: 0,
    unknown: 0,
    devices: 0,
  });

  const itemStore = useItemsStore();

  const fetching = async () => {
    dashInfo.value = await itemStore.getItemsInfo();

    isLoading.value = false;
  };

  onMounted(fetching);

  return {
    dashInfo,
    isLoading,
  };
}
