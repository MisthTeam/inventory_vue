import { useItemsStore } from "@/stores";
import { onMounted, onUnmounted, ref } from "vue";
import { useToast } from "vue-toastification";

export default function getItem(id) {
  const isLoading = ref(true);
  const toast = useToast();
  const itemsStore = useItemsStore();
  const itemRef = ref(null);
  const fetching = async () => {
    try {
      const { item } = await itemsStore.getItem(id);
      itemRef.value = item;
    } catch (error) {
      toast.error("Произошла ошибка при получении данных. Попробуйте позже");
      console.log(error);
    }
    isLoading.value = false;
  };

  onMounted(fetching);
  onUnmounted(() => {
    itemRef.value = null;
  });

  return {
    itemsStore,
    itemRef,
    isLoading,
  };
}
