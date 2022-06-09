<template>
  <ul class="pagination justify-content-center">
    <li class="page-item" :class="{ disabled: modelValue === 1 }">
      <a href="#" class="page-link" @click.prevent="changePage(modelValue - 1)"> Назад </a>
    </li>
    <li v-for="(item, index) in items" :key="index" class="page-item" :class="item.class">
      <a href="#" class="page-link" @click.prevent="changePage(item.page!)"> {{ item.page || "..." }}</a>
    </li>
    <li class="page-item" :class="{ disabled: modelValue === totalPages }">
      <a href="#" class="page-link" @click.prevent="changePage(modelValue + 1)"> Вперёд </a>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: "BasePagination",
};
</script>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue?: number;
  totalPages: number;
}

type itemPageType = {
  page?: number;
  class: "active" | "" | "disabled";
};

const props = withDefaults(defineProps<Props>(), {
  totalPages: 1,
  modelValue: 1,
});

const emit = defineEmits<{
  (event: "update:modelValue", id: number): void;
}>();

const items = computed(() => {
  var items: Array<itemPageType> = [];
  if (props.totalPages > 6) {
    if (props.modelValue < 4) {
      for (let i = 1; i <= 3; i++) {
        items.push({
          page: i,
          class: props.modelValue == i ? "active" : "",
        });
      }
      if (props.modelValue === 3) {
        items.push({ page: 4, class: "" });
      }
      items.push({ page: 0, class: "disabled" });
      items.push({ page: props.totalPages, class: "" });
    } else if (props.totalPages - props.modelValue < 3) {
      items.push({ page: 1, class: "" });
      items.push({ class: "disabled" });
      if (props.modelValue == props.totalPages - 2) {
        items.push({ page: props.totalPages - 3, class: "" });
      }
      for (let i = props.totalPages - 2; i <= props.totalPages; i++) {
        items.push({
          page: i,
          class: props.modelValue == i ? "active" : "",
        });
      }
    } else {
      items.push({ page: 1, class: "" });
      items.push({ page: 0, class: "disabled" });
      items.push({ page: props.modelValue - 1, class: "" });
      items.push({ page: props.modelValue, class: "active" });
      items.push({ page: props.modelValue + 1, class: "" });
      items.push({ page: 0, class: "disabled" });
      items.push({ page: props.totalPages, class: "" });
    }
  } else {
    for (let i = 1; i <= props.totalPages; i++) {
      items.push({
        page: i,
        class: props.modelValue == i ? "active" : "",
      });
    }
  }
  return items;
});

const changePage = (page: number | null) => {
  if (page) emit("update:modelValue", page);
};
</script>
