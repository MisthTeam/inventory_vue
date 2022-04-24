import { useItemsStore } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

export default function getItems() {
  const itemsStore = useItemsStore();
  const itemsRef = storeToRefs(itemsStore).items;
  const fetching = async () => {
    try {
      const items = await itemsStore.getItems();
      itemsRef.value = items;
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(fetching);

  return {
    itemsStore,
    itemsRef,
  };
}
