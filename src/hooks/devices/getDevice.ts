import { Ref, ref } from "vue";
import { useDevicesStore } from "@/stores";
import { useToast } from "vue-toastification";
import { Device } from "@/stores/devices/types";
import { addItemParams } from "@/stores/items/types";

export default function getDevice(dto: Ref<addItemParams>) {
  const isLoading = ref(false);
  const deviceStore = useDevicesStore();
  const toats = useToast();
  const device = ref<Device | null>(null); // Device из БД
  const responseRec = ref(false); // Получен ответ или нет

  const onSubmit = async () => {
    responseRec.value = false;
    try {
      isLoading.value = true;
      device.value = await deviceStore.getDeviceByPn(dto.value.pn);
      if (device.value) dto.value.device = device.value;
      else dto.value.device = { type: "HDD", specification: {} };
      responseRec.value = true;
    } catch (error) {
      console.error(error);
      toats.error("Случилась ошибка, попробуйте позже");
    }
    isLoading.value = false;
  };

  return {
    onSubmit,
    isLoadingDevice: isLoading,
    responseRec,
    device,
  };
}
