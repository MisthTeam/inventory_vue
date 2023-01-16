import { useItemsStore } from "@/stores";
import { fetchItemsParams } from "@/stores/items/types";
import { storeToRefs } from "pinia";
import { onUnmounted, ref } from "vue";

export default function getItems() {
  const isLoading = ref(true);
  const itemsStore = useItemsStore();
  const itemsRef = storeToRefs(itemsStore).items;
  const fetching = async (params: fetchItemsParams = { limit: 10, page: 1, filter: {} }) => {
    isLoading.value = true;

    itemsRef.value = await itemsStore.getItems({ ...params });

    isLoading.value = false;
  };

  onUnmounted(() => {
    itemsStore.$reset();
  });

  return {
    fetching,
    itemsStore,
    itemsRef,
    isLoading,
  };
}
