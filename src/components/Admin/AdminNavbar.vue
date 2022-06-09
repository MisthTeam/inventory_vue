<template>
  <div
    class="col-1 p-0 justify-content-center navbar-light bg-light fixed-top mt-5"
    style="width: 55px; height: 100vh"
  >
    <nav class="sidebar-sticky">
      <div class="navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav text-center flex-column">
          <li class="nav-item" v-for="(_, page) in adminPages" :key="page">
            <router-link
              :to="{ path: `/admin/${page}` }"
              :class="[
                'nav-link',
                {
                  active: currentPage === page,
                  disabled: disabled,
                },
              ]"
            >
              <component :is="'i'" :class="iconsPage[page]" />
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { adminPages } from "@/utils/helpers";
import { ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  currentPage: {
    type: String,
    default: "device",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const route = useRoute();

const iconsPage = {
  device: "bi bi-card-list",
  users: "bi bi-people-fill",
  fields: "bi bi-exclude",
  logs: "bi bi-file-text-fill",
};

const currentPage = ref(route.meta?.page || props.currentPage);
</script>
<style scoped>
.mt-5 {
  margin-top: 3.5rem !important;
}
.ml-c {
  margin-left: 52px;
}
</style>
