<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col" class="col-4">P/N</th>
        <th scope="col" class="col-1">Тип устройства</th>
        <th scope="col" class="col-2">Юзер</th>
        <th scope="col" class="col-2">Дата</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <DeviceItem
        v-for="(device, index) in devices"
        :key="device.id"
        :device="device"
        @deleteDevice="$emit('deleteDevice', index)"
      />
      <div v-show="!devices.length" class="text-center">
        <h5>Устройства не найдены</h5>
      </div>
    </tbody>
  </table>
</template>
<script setup>
import DeviceItem from "./DeviceItem.vue";
defineProps({
  devices: {
    type: Array,
    required: true,
  },
});
defineEmits(["deleteDevice"]);
</script>
