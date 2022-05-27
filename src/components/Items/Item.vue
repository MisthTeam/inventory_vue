<template>
  <tr @click="toItem(item.id)">
    <td>{{ item.meta?.name || "nope" }}</td>
    <td>{{ item.device.type }}</td>
    <td class="d-sm-table-cell d-none">{{ itemInfo(item) }}</td>
    <td class="d-sm-table-cell d-none">{{ item.user.login }}</td>
    <td>
      <span
        class="badge"
        :class="{
          'badge-success': item.status.id === 1,
          'badge-danger': item.status.id === 2,
        }"
        >{{ item.status.name }}</span
      >
    </td>
    <td>
      {{ convertTime(item.created_at) }}
    </td>
  </tr>
</template>

<script setup>
import { useRouter } from "vue-router";
import { convertTime } from "../../utils/helpers";

defineProps({
  item: {
    type: Object,
    required: true,
  },
});


const router = useRouter();
const toItem = (id) => {
  router.push(`/items/${id}`);
};
const itemInfo = (item) => {
  const info = {
    HDD: item.device.specification.volume,
    SSD: item.device.specification.volume,
    CPU: item.device.specification.model,
    GPU: item.device.specification.model,
    NVMe: item.device.specification.volume,
    networkCard: item.device.specification.connector,
    raidController: item.device.specification.model,
    DRAM: item.device.specification.volume,
  };
  return info[item.device.type] || "None";
};
</script>

<style scoped>
tbody tr:hover {
  background-color: #212529;
  color: white;
  cursor: pointer;
}
</style>
