import { ref } from "vue";
import { useDevicesStore } from "@/stores";
import { useToast } from "vue-toastification";

export default function getDevice(dto) {
    const isLoading = ref(false);
    const deviceStore = useDevicesStore();
    const toats = useToast();
    const device = ref(null); // Device из БД
    const responseRec = ref(false); // Получен ответ или нет

    const onSubmit = async () => {
        responseRec.value = false;
        try {
            isLoading.value = true;
            device.value = await deviceStore.getDeviceByPn(dto.value.pn);
            dto.value.device = device.value || { specification: {}, type: null };
            responseRec.value = true;
        } catch (error) {
            console.error(error);
            toats.error('Случилась ошибка, попробуйте позже');
        }
        isLoading.value = false;
    };

    return {
        onSubmit,
        isLoadingDevice: isLoading,
        responseRec,
        device,
    }
}