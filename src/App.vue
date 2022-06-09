<template>
  <Navbar :user="user" :isLoggenIn="userStore.isLoggenIn" />
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </template>
    <template v-else>
      <LoadingSpinner />
    </template>
  </router-view>
</template>

<script setup lang="ts">
import Navbar from "@/components/NavbarMenu.vue";
import { useUserStore } from "@/stores";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>

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
