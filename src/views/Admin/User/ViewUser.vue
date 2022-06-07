<template>
  <div class="container-fluid">
    <div class="row">
      <AdminNavbar currentPage="users" />
      <div class="col mt-6 ml-c">
        <div class="row justify-content-center">
          <div class="col-xl-3 col-lg-2 col-md-12 col-12 mt-2">
            <div class="row">
              <div class="col">
                <h4>Пользователь</h4>
                <h6>misthntism</h6>
                <h6 class="text-muted">cblpgamer@yandex.ru</h6>
                <div class="list-group shadow ps-0 mt-4">
                  <button
                    v-for="(name, component) in userComponents"
                    :key="component"
                    type="button"
                    class="list-group-item list-group-item-action"
                    :class="{
                      active: currentUserPage === component,
                    }"
                    aria-current="true"
                    @click="currentUserPage = component"
                  >
                    {{ name }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Этот кол должен быть вынесен и разбит по отдельности -->
          <div class="col-xl-8 col-lg-8 col-md-12 col-12 mt-2">
            <component :is="userPages[currentUserPage]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import AdminNavbar from "@/components/Admin/AdminNavbar.vue";
import params from "@/components/Admin/User/UserParams.vue";
import roles from "@/components/Admin/User/UserRoles.vue";
import { ref } from "vue";
const currentUserPage = ref("params");

const userComponents = {
  params: "Параметры",
  roles: "Права",
};

const userPages = {
  params,
  roles,
};
</script>
