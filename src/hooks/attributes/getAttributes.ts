import { onMounted, ref } from "vue";
import { api } from "@/utils/api";
import { useToast } from "vue-toastification";
import { ApiResponse } from "@/interfaces/api.interface";
import { Attribute } from "@/stores/attrubutes/types";
import { useAttributesStore } from "@/stores";
import { storeToRefs } from "pinia";

export default function getAttributes() {
  const isLoading = ref(true);
  const attributesStore = useAttributesStore();
  const attributes = storeToRefs(attributesStore).attributes;
  const toast = useToast();
  const fetching = async () => {
    try {
      attributes.value = await attributesStore.getAttrubtes();
    } catch (error) {
      import.meta.env.DEV && console.error(error);
    }
    isLoading.value = false;
  };

  onMounted(fetching);

  return {
    attributes,
    isLoading,
  };
}
