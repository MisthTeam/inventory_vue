import { useItemsStore } from "@/stores";
import { fetchItemsParams } from "@/stores/items/types";
import { storeToRefs } from "pinia";
import { onUnmounted, ref } from "vue";
import { useToast } from "vue-toastification";

export default function getItems() {
  const isLoading = ref(true);
  const toast = useToast();
  const itemsStore = useItemsStore();
  const itemsRef = storeToRefs(itemsStore).items;
  const fetching = async (params: fetchItemsParams = { limit: 10, page: 1, filter: {} }) => {
    isLoading.value = true;
    try {
      itemsRef.value = await itemsStore.getItems(params);
    } catch (error) {
      import.meta.env.DEV && console.error(error);
    } finally {
      isLoading.value = false;
    }
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
