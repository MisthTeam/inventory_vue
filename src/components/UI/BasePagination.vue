<template>
  <ul class="pagination justify-content-center">
    <li class="page-item" :class="{ disabled: !isPrevControlsActive }">
      <img src="@/assets/icons/pagination-left.svg" class="page-link" @click.prevent="changePage(modelValue - 1)" />
    </li>
    <li
      v-for="(page, index) in pagination"
      :key="index"
      class="page-item"
      :class="{
        active: page === modelValue,
      }"
    >
      <a href="#" class="page-link" @click.prevent="changePage(page)"> {{ page }}</a>
    </li>

    <li class="page-item" :class="{ disabled: !isNextControlsActive }">
      <img src="@/assets/icons/pagination-right.svg" class="page-link" @click.prevent="changePage(modelValue + 1)" />
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
  rangeSize?: number;
}

type itemPageType = {
  page?: number;
  class: "active" | "" | "disabled";
};

const props = withDefaults(defineProps<Props>(), {
  totalPages: 1,
  modelValue: 1,
  rangeSize: 1,
});

const emit = defineEmits<{
  (event: "update:modelValue", id: number): void;
}>();

const pagination = computed((): (number | null)[] => {
  const res = [];

  const minPaginationElems = 5 + props.rangeSize * 2;

  let rangeStart = props.totalPages <= minPaginationElems ? 1 : props.modelValue - props.rangeSize;
  let rangeEnd = props.totalPages <= minPaginationElems ? props.totalPages : props.modelValue + props.rangeSize;

  rangeEnd = rangeEnd > props.totalPages ? props.totalPages : rangeEnd;
  rangeStart = rangeStart < 1 ? 1 : rangeStart;

  if (props.totalPages > minPaginationElems) {
    const isStartBoundaryReached = rangeStart - 1 < 3;
    const isEndBoundaryReached = props.totalPages - rangeEnd < 3;
    if (isStartBoundaryReached) {
      rangeEnd = minPaginationElems - 2;
      for (let i = 1; i < rangeStart; i++) {
        res.push(i);
      }
    } else {
      res.push(1);
      res.push(null);
    }

    if (isEndBoundaryReached) {
      rangeStart = props.totalPages - (minPaginationElems - 3);
      for (let i = rangeStart; i <= props.totalPages; i++) {
        res.push(i);
      }
    } else {
      for (let i = rangeStart; i <= rangeEnd; i++) {
        res.push(i);
      }
      res.push(null);
      res.push(props.totalPages);
    }
  } else {
    for (let i = rangeStart; i <= rangeEnd; i++) {
      res.push(i);
    }
  }
  return res;
});

const isPrevControlsActive = computed(() => {
  return props.modelValue > 1;
});
const isNextControlsActive = computed(() => {
  return props.modelValue < props.totalPages;
});

const changePage = (page: number | null) => {
  if (page) emit("update:modelValue", page);
};
</script>
