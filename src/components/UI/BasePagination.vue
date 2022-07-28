<template>
  <ul class="pagination justify-content-center">
    <li class="page-item" :class="{ disabled: !isPrevControlsActive || disabled }">
      <span class="page-link pointer" @click.prevent="changePage(modelValue - 1)"
        ><i class="bi bi-caret-left-fill"></i
      ></span>
    </li>
    <li
      v-for="(page, index) in pagination"
      :key="index"
      class="page-item"
      :class="{
        active: page === modelValue,
        disabled: page === '...' || disabled,
      }"
    >
      <span class="page-link pointer" @click.prevent="changePage(page)"> {{ page }}</span>
    </li>
    <li class="page-item" :class="{ disabled: !isNextControlsActive || disabled }">
      <span class="page-link pointer" @click.prevent="changePage(modelValue + 1)"
        ><i class="bi bi-caret-right-fill"></i
      ></span>
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
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  totalPages: 1,
  modelValue: 1,
  rangeSize: 1,
  disabled: false,
});

const emit = defineEmits<{
  (event: "update:modelValue", id: number): void;
}>();

const pagination = computed((): (number | null | string)[] => {
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
      res.push("...");
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
      res.push("...");
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

const changePage = (page: number | null | string) => {
  if (typeof page === "number") emit("update:modelValue", page);
};

if (props.modelValue > props.totalPages) {
  changePage(1);
}
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
</style>
