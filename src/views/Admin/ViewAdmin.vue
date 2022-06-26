<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <AdminNavbar />
      <div class="col-10 mt-6 ml-c">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminNavbar from "@/components/Admin/AdminNavbar.vue";
</script>

<style scoped>
.mt-5 {
  margin-top: 3.5rem !important;
}
.ml-c {
  margin-left: 52px;
}
</style>
