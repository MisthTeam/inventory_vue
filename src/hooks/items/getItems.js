import { useItemsStore } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";
import { useToast } from "vue-toastification";

export default function getItems() {
  const isLoading = ref(true);
  const toast = useToast();
  const itemsStore = useItemsStore();
  const itemsRef = storeToRefs(itemsStore).items;
  const fetching = async (params = { limit: 10, page: 1 }) => {
    isLoading.value = true;
    try {
      const data = await itemsStore.getItems(params);
      itemsRef.value = ref(data);
    } catch (error) {
      toast.error("Произошла ошибка при получении данных. Попробуйте позже");
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetching);
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
