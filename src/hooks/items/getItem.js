import { useItemsStore } from "@/stores";
import { onMounted, onUnmounted, ref } from "vue";

export default function getItem(id) {
  const isLoading = ref(true);
  const itemsStore = useItemsStore();
  const itemRef = ref(null);
  const fetching = async () => {
    try {
      const { item } = await itemsStore.getItem(id);
      itemRef.value = item;
    } catch (error) {
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
