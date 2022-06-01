import { useItemsStore } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";
import { useToast } from "vue-toastification";

export default function getItems() {
  const isLoading = ref(true);
  const toast = useToast();
  const itemsStore = useItemsStore();
  const itemsRef = storeToRefs(itemsStore).items;
  const fetching = async () => {
    if (!itemsRef.value.length) {
      try {
        itemsRef.value = await itemsStore.getItems();
      } catch (error) {
        toast.error("Произошла ошибка при получении данных. Попробуйте позже");
        console.log(error);
      }
    }
    isLoading.value = false;
  };

  onMounted(fetching);
  onUnmounted(() => {
    itemsStore.$reset();
  });

  return {
    itemsStore,
    itemsRef,
    isLoading,
  };
}
