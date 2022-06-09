<script setup lang="ts">
import DeviceList from "../../../components/Admin/Devices/DevicesList.vue";
import { getDevices } from "@/hooks/devices";
import { deviceTypes } from "@/utils/helpers";
import { watch, ref } from "vue";

const { devices, isLoading, fetching } = getDevices();

const searchQuery = ref(""); // Сортировка по выбранному селектору
const sortedValue = ref(""); // Фильтрация по названию
const page = ref(devices.value.meta?.current_page || 1);

const deleteDevice = async (value: number) =>
  (devices.value.data = devices.value.data.filter((device) => device.id !== value));

watch([page, sortedValue, searchQuery], () => {
  fetching({
    page: page.value,
    limit: 10,
    search: searchQuery.value,
    type: sortedValue.value,
  });
});
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2">
        <BaseSelector v-model="sortedValue" :options="deviceTypes.map((t) => t.type)" />
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2">
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
      <div class="col-xl- col-lg-8 col-md-12 col-12 mt-2">
        <LoadingSpinner v-if="isLoading" />
        <DeviceList v-else :devices="devices.data" @deleteDevice="deleteDevice" />
        <BasePagination v-model="page" :current-page="page" :totalPages="devices.meta?.last_page || 1" />
      </div>
    </div>
  </div>
</template>
