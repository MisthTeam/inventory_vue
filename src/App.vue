<script setup>
import Navbar from "@/components/NavbarMenu.vue";
import { useUserStore } from "@/stores";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>

<template>
  <Navbar :user="user" :isLoggenIn="userStore.isLoggenIn" />
  <router-view v-slot="{ Component, route }">
    <Transition name="fade">
      <component :is="Component" :key="route.path" />
    </Transition>
  </router-view>
</template>

<style>
html {
  height: 100%;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
