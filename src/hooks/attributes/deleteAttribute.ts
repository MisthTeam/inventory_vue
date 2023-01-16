import { ref } from "vue";
import { useAttributesStore } from "@/stores";

export default function deleteAttribute() {
  const isLoading = ref(false);
  const attributesStore = useAttributesStore();

  const deleting = async (attr_id: number) => {
    isLoading.value = true;
    await attributesStore.deleteAttribute(attr_id);
    isLoading.value = false;
  };

  return {
    isLoading,
    deleting,
  };
}
