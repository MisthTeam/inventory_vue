<script setup>
import { ref, shallowRef, watch } from "vue";
import { useDevicesStore, useItemsStore } from "@/stores";
import { types } from "@/utils/helpers";

const dto = shallowRef({
  pn: "",
  device: { specification: {}, type: null },
  item: {},
});
const device = ref(null); // Получение девайса из БД
const optionsValue = ref(null); // Выбор типа девайса
const responseRec = ref(false); // Получен ответ или нет (для вывода доп инпутов)
const deviceStore = useDevicesStore();
const itemStore = useItemsStore();

const onSubmit = async () => {
  try {
    device.value = await deviceStore.getDeviceByPn(dto.value.pn);
    dto.value.device = device.value || { specification: {} };
    optionsValue.value = device.value?.type || null;
    responseRec.value = true;
  } catch (error) {
    console.error(error);
  }
};

watch(optionsValue, (value) => {
  dto.value.device.type = value;
  if (!device.value) {
    dto.value.device.specification = {};
  }
});

const addItem = async () => {
  try {
    await itemStore.createItem(dto.value);
  } catch (error) {
    console.error(error);
  }
};
const logs = ({ target, value }) => {
  dto.value.device.specification[target] = value;
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
        <select
          class="form-select"
          v-model="optionsValue"
          :disabled="device"
          aria-label="Device type"
        >
          <option v-for="t in types" :key="t.id" :value="t.type">
            {{ t.type }}
          </option>
        </select>
        <label for="floatingInput">Device type</label>
      </div>
      <AddSpecFields
        :dto="dto"
        v-if="optionsValue"
        :option="optionsValue"
        :device="device"
        @editDevice="logs"
      />
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
