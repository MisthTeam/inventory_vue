import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAttributesStore } from "@/stores";

export default function getAttributesByType() {
  const isLoading = ref(false);
  const attributesStore = useAttributesStore();
  const attributes = storeToRefs(attributesStore).attributes;

  const getAttribute = async (device_type: string) => {
    isLoading.value = true;
    attributes.value = await attributesStore.getAttributesByType(device_type);
    isLoading.value = false;
  };

  return {
    attributes,
    isLoadingAttribute: isLoading,
    getAttribute,
  };
}
