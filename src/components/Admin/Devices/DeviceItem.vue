<template>
  <tr>
    <td>{{ device.pn }}</td>
    <td>{{ device.type }}</td>
    <td class="">misthntism</td>
    <td class="">{{ convertTime(device.created_at) }}</td>
    <td class="text-end">
      <BaseButton class="btn-danger" :disabled="isDeleteLoading" @clickButton="deleteDev">
        <i class="bi bi-trash-fill" />
      </BaseButton>
      <BaseButton
        type="button"
        class="btn-warning ms-lg-1 ms-md-1 ms-0 mt-xl-0 mt-lg-1 mt-md-0 mt-sm-1 mt-1"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        @click="openModal"
      >
        <i class="bi bi-pencil-fill" />
      </BaseButton>
    </td>
  </tr>
</template>
<script setup lang="ts">
import { deleteDevice } from "@/hooks/devices/deleteDevice";
import { convertTime } from "@/utils/helpers";
import { Device } from "@/stores/devices/types";

interface Props {
  device: Device;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: "deleteDevice", value: Device): void;
  (event: "openModal", value: Device): void;
}>();

const { isDeleteLoading, deleting: deleteItem } = deleteDevice(props.device.id);

const deleteDev = async () => {
  deleteItem().then((v) => emit("deleteDevice", v));
};
const openModal = () => emit("openModal", props.device);
</script>
