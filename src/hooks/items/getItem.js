import { useItemsStore } from "@/stores";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

export default function getItem(id) {
  const isLoading = ref(false);
  const toast = useToast();
  const itemsStore = useItemsStore();
  const item = ref(null);

  const fetching = async () => {
    isLoading.value = true;
    try {
      item.value = (await itemsStore.getItem(id)) || null;
    } catch (error) {
      toast.error("Произошла ошибка при получении данных. Попробуйте позже");
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetching);

  return {
    itemsStore,
    item,
    isLoading,
  };
}
