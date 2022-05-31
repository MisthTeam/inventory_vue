<script setup>
import DeviceTable from "./DeviceTable.vue";
import { getDevices, useSortedDevices, useSearch } from "@/hooks/devices";
import { types } from "@/utils/helpers";

const { devices, isLoading } = getDevices();
const { sortedValue, sortedDevices } = useSortedDevices(devices);
const { searchQuery, searchedDevices } = useSearch(sortedDevices);
const deleteDevice = async (value) => {
  devices.value.splice(value, 1);
};
</script>

<template>
  <LoadingSpinner v-if="isLoading" />
  <div v-if="devices && !isLoading" class="container">
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2">
        <BaseSelector v-model="sortedValue" :options="types" />
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2">
        <input
          v-model="searchQuery"
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
        <DeviceTable :devices="searchedDevices" @deleteDevice="deleteDevice" />
      </div>
    </div>
  </div>
</template>
