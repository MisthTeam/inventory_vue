<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col mt-6 ml-c">
        <LoadingSpinner v-if="isLoading" />
        <div v-else-if="user" class="row justify-content-center">
          <div class="col-xl-3 col-lg-2 col-md-12 col-12 mt-2">
            <div class="row">
              <div class="col">
                <h4>Пользователь</h4>
                <h6>{{ user?.login }}</h6>
                <h6 class="text-muted">{{ user?.email }}</h6>
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
          <div class="col-xl-8 col-lg-8 col-md-12 col-12 mt-2">
            <KeepAlive>
              <component :is="userPages[currentUserPage]" :user="user" />
            </KeepAlive>
          </div>
        </div>
        <div v-else class="text-center">
          <h5>Не нашел данного пользователя</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import params from "@/components/Admin/User/UserParams.vue";
import roles from "@/components/Admin/User/UserRoles.vue";
import { getUser } from "@/hooks/user";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { isLoading, user } = getUser(Number(route.params?.id));

const currentUserPage = ref<keyof typeof userComponents>("params");

const userComponents = {
  params: "Параметры",
  roles: "Права",
};

const userPages = {
  params,
  roles,
};
</script>
