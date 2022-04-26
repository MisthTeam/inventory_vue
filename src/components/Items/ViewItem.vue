<script setup>
import { getItems } from "@/hooks";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { itemsStore } = getItems();
const item = computed(() => itemsStore.getItemById(route.params.id));
</script>
<template>
  <div>
    <p>{{ item }}</p>
  </div>
</template>
