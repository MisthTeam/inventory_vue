<script setup lang="ts">
import { getDevices } from "@/hooks/devices";
import { deviceTypes } from "@/utils/helpers";
import { computed, onMounted, watchEffect } from "vue";
import DeviceList from "@/components/Admin/Devices/DevicesList.vue";
import { useRoute, useRouter } from "vue-router";
import { fetchDevicesParams } from "@/stores/devices/types";
import useFilterable from "@/hooks/use/filterable";

const { devices, isLoading, fetching } = getDevices();
const { page, sortedValue, searchQuery } = useFilterable({
  fetching,
});

const route = useRoute();

const params = computed<fetchDevicesParams>(() => ({
  page: page.value,
  search: searchQuery.value,
  type: sortedValue.value,
})); // Параметры

const router = useRouter();

const onSubmit = () => {
  router.push({
    query: {
      page: page.value,
      search: searchQuery.value,
      sorted: sortedValue.value,
    },
  });
  fetching(params.value);
};

watchEffect(() => {
  if (Object.keys(route.query).length) {
    page.value = Number(route.query.page);
    sortedValue.value = String(route.query.sorted);
    searchQuery.value = String(route.query.search);
  }
});

onMounted(() => {
  fetching(params.value);
});
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-4 col-12 mt-2">
        <BaseSelector v-model="sortedValue" :options="deviceTypes.map((t) => t.type)" />
      </div>
      <div class="col-xl-4 col-12 mt-2">
        <input
          v-model.lazy="searchQuery"
          type="text"
          class="form-control"
          placeholder="Поиск"
          aria-label="enter pn"
          aria-describedby="button-addon2"
        />
      </div>
    </div>
    <div class="row justify-content-center text-center mt-2">
      <div class="col-lg-8">
        <BaseButton class="btn-dark" type="submit" :disabled="isLoading" @click="onSubmit">Показать</BaseButton>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-xl-8 col-12 mt-2">
        <LoadingSpinner v-if="isLoading" />
        <DeviceList v-else :devices="devices.data" />
        <BasePagination v-model="page" :current-page="page" :totalPages="devices.meta?.last_page || 1" />
      </div>
    </div>
  </div>
</template>
