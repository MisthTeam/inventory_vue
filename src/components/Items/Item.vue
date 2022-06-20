<!-- eslint-disable vue/multi-word-component-names  -->
<template>
  <tr @click="toItem(item.id)">
    <td>{{ item.meta?.name || "nope" }}</td>
    <td>{{ item.device.type }}</td>
    <td class="d-sm-table-cell d-none">{{ itemInfo(item.device.type) }}</td>
    <td class="d-sm-table-cell d-none">{{ item.user.login }}</td>
    <td>
      <span class="badge" :class="classObject">{{ item.status.name }}</span>
    </td>
    <td>
      {{ convertTime(item.created_at) }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { convertTime } from "@/utils/helpers";
import { Item } from "@/stores/items/types";
import { VolumeSpecification } from "@/stores/devices/types";

interface Props {
  item: Item;
}

const props = defineProps<Props>();

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

const infoItem = {
  HDD:
    (props.item.device.specification?.volume as VolumeSpecification)?.capacity +
    (props.item.device.specification?.volume as VolumeSpecification)?.unit,
  SSD:
    (props.item.device.specification?.volume as VolumeSpecification)?.capacity +
    (props.item.device.specification?.volume as VolumeSpecification)?.unit,
  CPU: props.item.device.specification?.model,
  GPU: props.item.device.specification?.model,
  NVMe:
    (props.item.device.specification?.volume as VolumeSpecification)?.capacity +
    (props.item.device.specification?.volume as VolumeSpecification)?.unit,
  networkCard: props.item.device.specification?.connector,
  raidController: props.item.device.specification?.model,
  DRAM:
    (props.item.device.specification?.volume as VolumeSpecification)?.capacity +
    (props.item.device.specification?.volume as VolumeSpecification)?.unit,
};

const router = useRouter();
const toItem = (id: number) => router.push(`/items/${id}`);
const itemInfo = (type: string) => infoItem[type as keyof typeof infoItem] || "None";
</script>

<style scoped>
tbody tr:hover {
  background-color: #212529;
  color: white;
  cursor: pointer;
}
</style>
