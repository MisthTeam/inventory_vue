import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAttributesStore } from "@/stores";

export default function getAttributes() {
  const isLoading = ref(true);
  const attributesStore = useAttributesStore();
  const attributes = storeToRefs(attributesStore).attributes;

  const fetching = async () => {
    attributes.value = await attributesStore.getAttrubtes();
    isLoading.value = false;
  };

  onMounted(fetching);

  return {
    attributes,
    isLoading,
  };
}
