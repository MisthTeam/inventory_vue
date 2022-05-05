<script setup>
import { getItem, checkUserRole } from "@/hooks";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores";

const route = useRoute();
const userStore = useUserStore();
const { itemRef, isLoading } = getItem(route.params.id);
const { isHasRole } = checkUserRole(userStore.getUser, "items:control");
</script>
<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="container" v-if="itemRef && !isLoading">
    <div class="row">
      <div class="row justify-content-center" v-if="isHasRole">
        <div class="col-xl-4 col-lg-4 col-md-6 col-12">
          <router-link
            :to="{ path: `/items/add` }"
            type="button"
            class="btn btn-block btn-warning"
          >
            <b>Изменить</b>
          </router-link>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-md-0 mt-2">
          <router-link
            :to="{ path: `/items/add` }"
            type="button"
            class="btn btn-block btn-danger"
          >
            <b>Удалить</b>
          </router-link>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <AddItemsFields :disabled="true" v-model="itemRef.meta.name" />
          <AddAttributeFields
            :disabled="true"
            :attributes="itemRef.attributes"
          />
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <div class="form-floating mb-3">
            <select class="form-select" disabled aria-label="Device type">
              <option selected value="">{{ itemRef.device.type }}</option>
            </select>
            <label for="floatingInput">Device type</label>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <AddSpecFields
            :dto="{}"
            :option="itemRef.device.type"
            :device="itemRef.device"
          />
        </div>
      </div>
    </div>
    {{ itemRef.attributes }}
  </div>
</template>
