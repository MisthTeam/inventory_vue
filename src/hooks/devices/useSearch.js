import { computed, ref } from "vue";

export default function useSearchItems(sortedDevices) {
  const searchQuery = ref("");
  const searchedDevices = computed(() => {
    return sortedDevices.value.filter((device) => {
      return device.pn
        .toLowerCase()
        .trim()
        .includes(searchQuery.value.trim().toLowerCase());
    });
  });

  return {
    searchQuery,
    searchedDevices,
  };
}
