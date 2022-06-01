<template>
  <tr>
    <td>{{ device.pn }}</td>
    <td>{{ device.type }}</td>
    <td class="">misthntism</td>
    <td class="">{{ convertTime(device.created_at) }}</td>
    <td class="text-end">
      <BaseButton
        @clickButton="deleteDev"
        :disabled="isDeleteLoading"
        class="btn-danger"
      >
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
<script setup>
import { deleteDevice } from "@/hooks/devices/deleteDevice";
import { convertTime } from "@/utils/helpers";

const props = defineProps({
  device: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["deleteDevice", "openModal"]);

const { isDeleteLoading, deleting } = deleteDevice(props.device.id);

const deleteDev = async () => {
  await deleting();
  emit("deleteDevice");
};
const openModal = () => emit("openModal", props.device);
</script>
