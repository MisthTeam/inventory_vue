import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useAttributesStore } from "@/stores";
import { storeToRefs } from "pinia";

export default function getAttributesByType() {
  const isLoading = ref(false);
  const toast = useToast();
  const attributesStore = useAttributesStore();
  const attributes = storeToRefs(attributesStore).attributes;

  const getAttribute = async (device_type: string) => {
    isLoading.value = true;
    try {
      attributes.value = await attributesStore.getAttributesByType(device_type);
    } catch (error) {
      import.meta.env.DEV && console.error(error);
    }
    isLoading.value = false;
  };

  return {
    attributes,
    isLoadingAttribute: isLoading,
    getAttribute,
  };
}
