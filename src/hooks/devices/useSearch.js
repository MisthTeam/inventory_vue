import { computed, ref } from "vue";

export default function useSearchItems(sortedDevices) {
  const searchQuery = ref("");
  const searchedDevices = computed(() => {
    return sortedDevices.value.filter((device) => {
      return device.pn.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
  });

  return {
    searchQuery,
    searchedDevices,
  };
}
