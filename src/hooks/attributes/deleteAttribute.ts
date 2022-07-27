import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useAttributesStore } from "@/stores";

export default function deleteAttribute() {
  const isLoading = ref(false);
  const toast = useToast();
  const attributesStore = useAttributesStore();

  const deleting = async (attr_id: number) => {
    isLoading.value = true;
    try {
      await attributesStore.deleteAttribute(attr_id);
    } catch (error) {
      import.meta.env.DEV && console.error(error);
    }
    isLoading.value = false;
  };

  return {
    isLoading,
    deleting,
  };
}
