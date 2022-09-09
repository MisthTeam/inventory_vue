<template>
  <tr>
    <td @click="toItem(item.id)">{{ item.meta.name }}</td>
    <td @click="sortByClick('type', item.device.type)">{{ item.device.type }}</td>
    <td class="d-sm-table-cell d-none" @click="sortByClick('info', item.device.type)">
      {{ itemInfo(item.device.type) }}
    </td>
    <td class="d-sm-table-cell d-none">{{ item.user.login }}</td>
    <td>
      <span class="badge" :class="classObject" @click="sortByClick('status', item.status.id)">{{
        item.status.name
      }}</span>
    </td>
    <td>
      {{ convertTime(item.created_at) }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { convertTime } from "@/utils/helpers";
import { infoItem } from "@/utils/helpers/getItemInfo";
import { filterByClick } from "@/utils/helpers/filterByClick";
import { Item } from "@/stores/items/types";
import { parse, stringify } from "qs";
import { inject } from "vue";

interface Props {
  item: Item;
}

const fetching: any = inject("fetching"); // Получение items из БД

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

const router = useRouter();
const route = useRoute();
const toItem = (id: number) => router.push(`/items/${id}`);
const itemInfo = (type: string) => infoItem(props.item, type) || "None";

const sortByClick = (itemType: string, info: string | number) => {
  const { type, filterObject } = filterByClick(props.item, itemType, info);
  const newFilterObject = Object.assign(
    { ...filterObject },
    {
      ...parse(route.query.filter as string),
    },
  );

  if (Object.keys(route.query).length) {
    router.push({
      query: {
        ...route.query,
        sorted: String(type).length ? type : String(route.query.sorted),
        filter: stringify(newFilterObject),
      },
    });
    fetching({
      page: Number(route.query.page),
      limit: Number(route.query.limit),
      search: String(route.query.search),
      type: String(type).length ? type : String(route.query.sorted),
      filter: newFilterObject,
    });
  } else {
    router.push({
      query: {
        page: 1,
        limit: 10,
        search: "",
        sorted: type,
        filter: stringify(filterObject),
      },
    });
    fetching({
      page: 1,
      limit: 10,
      search: "",
      type,
      filter: newFilterObject,
    });
  }
};
</script>

<style scoped>
tbody tr:hover {
  background-color: #212529;
  color: white;
  cursor: pointer;
}
</style>
