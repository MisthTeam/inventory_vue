import { useItemsStore } from "@/stores";
import { Item } from "@/stores/items/types";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

export default function getItem(id: string) {
  const isLoading = ref(false);
  const toast = useToast();
  const itemsStore = useItemsStore();
  const item = ref<Item | null>(null);

  const fetching = async () => {
    isLoading.value = true;
    try {
      item.value = await itemsStore.getItem(Number(id));
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
