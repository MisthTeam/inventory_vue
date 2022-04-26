<script setup>
import { ref } from "vue";
import { useDevicesStore, useItemsStore } from "@/stores";
import { getTypes } from "@/hooks";

const dto = ref({ pn: "", device: { specification: {} }, item: {} });
const device = ref(null);
const responseRec = ref(false);
const { typesRef } = getTypes();

const deviceStore = useDevicesStore();
const itemStore = useItemsStore();

const onSubmit = async () => {
  try {
    device.value = await deviceStore.getDeviceByPn(dto.value.pn);
    if (device.value) {
      dto.value.device = device.value;
    }
    responseRec.value = true;
  } catch (error) {
    console.error(error);
  }
};

const addItem = async () => {
  try {
    await itemStore.createItem(dto.value);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <form @submit.prevent="addItem">
    <form @submit.prevent="onSubmit">
      <div class="input-group mb-3">
        <input
          type="text"
          v-model="dto.pn"
          class="form-control"
          required
          placeholder="enter pn"
          aria-label="enter pn"
          aria-describedby="button-addon2"
        />
        <button class="btn btn-outline-secondary" type="submit">
          Проверить
        </button>
      </div>
    </form>
    <div v-if="responseRec">
      <div class="form-floating mb-3">
        <select class="form-select" :disabled="device" aria-label="Device type">
          <option
            :selected="device.type === types.type"
            v-for="types in typesRef"
            :key="types.id"
            :value="types.type"
          >
            {{ types.type }}
          </option>
        </select>
        <label for="floatingInput">Device type</label>
      </div>
      <!-- <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="device specification"
          :disabled="device"
          :value="device && device.specification"
          v-if="device"
        />
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="device specification"
          v-model="dto.device.specification"
          v-else
        />
        <label for="floatingInput">Device specification</label>
      </div> -->
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          v-model="dto.item.name"
          id="floatingInput"
          required
          placeholder="Item name"
        />
        <label for="floatingInput">Item name</label>
      </div>
      <button class="btn btn-outline-secondary" type="submit">
        Создать устройство
      </button>
    </div>
  </form>
  <!-- <button class="btn btn-primary btn-block mt-3" type="submit">
      Проверить
    </button> -->
</template>
