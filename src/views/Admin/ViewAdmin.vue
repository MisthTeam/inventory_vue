<template>
  <div class="container-fluid">
    <div class="row">
      <AdminNavbar :pages="adminPages" v-model:currentPage="currentPage" />
      <div class="col mt-6 ml-c">
        <component :is="adminPages[currentPage]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminNavbar from "@/components/Admin/AdminNavbar.vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { adminPages } from "@/utils/helpers";

const currentPage = ref("device");

const route = useRoute();
const pageQuery = computed(() => route.query.page);
</script>

<style scoped>
.mt-5 {
  margin-top: 3.5rem !important;
}
.ml-c {
  margin-left: 52px;
}
</style>
