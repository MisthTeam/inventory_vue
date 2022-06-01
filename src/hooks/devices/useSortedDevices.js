import { computed, ref } from "vue";

export default function sortedDevices(devices) {
  const sortedValue = ref("");
  const sortedDevices = computed(() => {
    return devices.value.filter((el) => {
      return el.type.indexOf(sortedValue.value) > -1;
    });
  });

  return {
    sortedValue,
    sortedDevices,
  };
}
