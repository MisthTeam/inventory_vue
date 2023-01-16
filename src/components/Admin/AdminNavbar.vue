<template>
  <div class="col-1 p-0 justify-content-center navbar-light bg-light fixed-top mt-5" style="width: 55px; height: 100vh">
    <nav class="sidebar-sticky">
      <div id="navbarSupportedContent" class="navbar-collapse">
        <ul class="navbar-nav text-center flex-column">
          <li v-for="(_, page) in adminPages" :key="page" class="nav-item">
            <router-link :to="{ path: `/admin/${page}` }" class="nav-link">
              <component :is="'i'" :class="iconsPage[page]" />
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { adminPages } from "@/utils/helpers";

const iconsPage = {
  device: "bi bi-card-list",
  users: "bi bi-people-fill",
  fields: "bi bi-exclude",
  logs: "bi bi-file-text-fill",
};
</script>

<style scoped>
.mt-5 {
  margin-top: 3.5rem !important;
}
.ml-c {
  margin-left: 52px;
}
</style>
