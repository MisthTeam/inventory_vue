<script setup lang="ts">
import { getDevices } from "@/hooks/devices";
import { deviceTypes } from "@/utils/helpers";
import { computed, onMounted, ref, watch } from "vue";
import DeviceList from "@/components/Admin/Devices/DevicesList.vue";
import { useRoute, useRouter } from "vue-router";
import { fetchDevicesParams } from "@/stores/devices/types";

const { devices, isLoading, fetching } = getDevices();

const route = useRoute();
const router = useRouter();

const searchQuery = ref(route.query.search?.toString() || ""); // Фильтрация по названию
const sortedValue = ref(route.query.sorted?.toString() || ""); // Сортировка по выбранному селектору
const page = ref(Number(route.query.page) || 1);

const params = computed<fetchDevicesParams>(() => ({
  page: page.value,
  search: searchQuery.value,
  type: sortedValue.value,
  limit: 10,
})); // Параметры

watch([page, sortedValue, searchQuery], ([newPage, newSorted, newSearch], [oldPage, oldSorted, oldSearch]) => {
  if (newSorted != oldSorted || newSearch != oldSearch) {
    router.push({
      path: route.path,
      query: {
        sorted: newSorted,
        search: newSearch,
        page: 1,
      },
    });
  } else {
    router.push({
      path: route.path,
      query: {
        sorted: newSorted,
        search: newSearch,
        page: newPage,
      },
    });
  }

  fetching(params.value);
});

watch(
  () => route.query,
  (queryParams) => {
    page.value = Number(queryParams.page || 1);
    sortedValue.value = String(queryParams.sorted || "");
    searchQuery.value = String(queryParams.search || "");
  },
  { deep: true },
);

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
    <div class="row justify-content-center">
      <div class="col-xl-8 col-12 mt-2">
        <LoadingSpinner v-if="isLoading" />
        <DeviceList v-else :devices="devices.data" />
        <BasePagination v-model="page" :current-page="page" :totalPages="devices.meta?.last_page || 1" />
      </div>
    </div>
  </div>
</template>
