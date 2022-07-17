<script setup lang="ts">
import { useUserStore } from "@/stores";
import { storeToRefs } from "pinia";
import { useTitle } from "@vueuse/core";
import { computed } from "vue";

import Navbar from "@/components/NavbarMenu.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const title = computed(() => {
  return (route.meta?.title as string) ?? "Inventory";
});

useTitle(title);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>

<template>
  <Navbar :user="user" :isLoggenIn="userStore.isLoggenIn" />
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </template>
    <template v-else>
      <LoadingSpinner />
    </template>
  </router-view>
</template>

<style>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}
</style>
