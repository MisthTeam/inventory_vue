<template>
  <div>
    <p>{{ itemsStore.getCurrentItem(+route.params.id) }}</p>
  </div>
</template>

<script setup>
import { getItems } from "@/hooks";
import { useRoute } from "vue-router";

const route = useRoute();
const { itemsStore } = getItems();
</script>
<style></style>
