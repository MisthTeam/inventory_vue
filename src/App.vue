<template>
  <Navbar :user="userStore.getUser" :isLoggenIn="userStore.isLoggenIn" />
  <router-view />
</template>

<script setup>
import Navbar from "@/components/NavbarMenu.vue";
import { useUserStore } from "@/stores";

const userStore = useUserStore();
</script>
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
