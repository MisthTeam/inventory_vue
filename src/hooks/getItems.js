import { useItemsStore } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";

export default function getItems() {
  const isLoading = ref(true);
  const itemsStore = useItemsStore();
  const itemsRef = storeToRefs(itemsStore).items;
  const fetching = async () => {
    if (!itemsRef.value.length) {
      try {
        const items = await itemsStore.getItems();
        itemsRef.value = items;
      } catch (error) {
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
