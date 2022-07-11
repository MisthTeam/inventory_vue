<template>
  <tr>
    <td>{{ device.pn }}</td>
    <td>{{ device.type }}</td>
    <td class="">{{ convertTime(device.created_at) }}</td>
    <td class="text-center">
      <BaseButton class="btn-danger" :disabled="isDeleteLoading" @clickButton="deleteItem">
        <i class="bi bi-trash-fill" />
      </BaseButton>
      <BaseButton
        type="button"
        class="btn-warning m-1"
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
import { Device } from "@/stores/devices/types";
import { convertTime } from "@/utils/helpers";

interface Props {
  device: Device;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: "openModal", value: Device): void;
}>();

const { isDeleteLoading, deleting: deleteItem } = deleteDevice(props.device.id);

const openModal = () => emit("openModal", props.device);
</script>
