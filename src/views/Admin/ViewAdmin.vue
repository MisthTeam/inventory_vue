<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-1 p-0 justify-content-center navbar-light bg-light fixed-top mt-5"
        style="width: 55px; height: 100vh"
      >
        <nav class="sidebar-sticky">
          <div class="navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav text-center flex-column">
              <li class="nav-item" v-for="(_, page) in pages" :key="page">
                <router-link
                  :to="{ query: { page: page } }"
                  :class="[
                    'nav-link',
                    {
                      active: currentPage === page,
                    },
                  ]"
                  @click="currentPage = page"
                >
                  <component :is="'i'" :class="iconsPage[page]" />
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="col mt-6 ml-c">
        <component :is="pages[currentPage]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import device from "@/components/Admin/DeviceList.vue";
import users from "@/components/Admin/UserList.vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const currentPage = ref("device");

const iconsPage = {
  device: "bi bi-card-list",
  users: "bi bi-people-fill",
  fields: "bi bi-exclude",
  logs: "bi bi-file-text-fill",
};

const pages = {
  device,
  users,
};

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
