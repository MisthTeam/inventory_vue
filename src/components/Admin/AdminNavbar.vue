<template>
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
                  disabled: disabled,
                },
              ]"
              @click="updatePage(page)"
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
const iconsPage = {
  device: "bi bi-card-list",
  users: "bi bi-people-fill",
  fields: "bi bi-exclude",
  logs: "bi bi-file-text-fill",
};

defineProps({
  pages: {
    type: Object,
    required: true,
  },
  currentPage: {
    type: String,
    required: false,
    default: "device",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["update:currentPage"]);

const updatePage = (page) => {
  emit("update:currentPage", page);
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
