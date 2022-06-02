<template>
  <tr @click="toItem(item.id)">
    <td>{{ item.meta?.name || "nope" }}</td>
    <td>{{ item.device.type }}</td>
    <td class="d-sm-table-cell d-none">{{ itemInfo(item) }}</td>
    <td class="d-sm-table-cell d-none">{{ item.user.login }}</td>
    <td>
      <span class="badge" :class="classObject">{{ item.status.name }}</span>
    </td>
    <td>
      {{ convertTime(item.created_at) }}
    </td>
  </tr>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { convertTime } from "../../utils/helpers";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const classObject = computed(() => ({
  "bg-primary": props.item.status.badge === "primary",
  "bg-secondary": props.item.status.badge === "secondary",
  "bg-success": props.item.status.badge === "success",
  "bg-danger": props.item.status.badge === "danger",
  "bg-warning": props.item.status.badge === "warning",
  "bg-info": props.item.status.badge === "info",
  "bg-light": props.item.status.badge === "light",
  "bg-dark": props.item.status.badge === "dark",
}));

const router = useRouter();
const toItem = (id) => {
  router.push(`/items/${id}`);
};
const itemInfo = (item) => {
  const info = {
    HDD: item.device.specification?.volume,
    SSD: item.device.specification?.volume,
    CPU: item.device.specification?.model,
    GPU: item.device.specification?.model,
    NVMe: item.device.specification?.volume,
    networkCard: item.device.specification?.connector,
    raidController: item.device.specification?.model,
    DRAM: item.device.specification?.volume,
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
