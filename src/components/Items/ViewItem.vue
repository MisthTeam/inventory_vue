<script setup>
import { getItems } from "@/hooks";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { itemsStore } = getItems();
const item = computed(() => itemsStore.getItemById(route.params.id));
</script>
<template>
  <div class="container" v-if="item">
    <div class="row">
      <div class="row justify-content-center">
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
          <AddItemsFields v-model="item.meta.name" />
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <div class="form-floating mb-3">
            <select class="form-select" disabled aria-label="Device type">
              <option selected value="">{{ item.device.type }}</option>
            </select>
            <label for="floatingInput">Device type</label>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <AddSpecFields
            :dto="{}"
            :option="item.device.type"
            :device="item.device"
          />
        </div>
      </div>
    </div>
  </div>
  {{ item.attributes }}
</template>
