<script setup>
import { useDevicesStore, useItemsStore } from "@/stores";
import { deviceTypes } from "@/utils/helpers";
import { ref, shallowRef, watch } from "vue";
import { useToast } from "vue-toastification";

const dto = shallowRef({
  pn: "",
  device: { specification: {}, type: null },
  item: {
    name: "",
  },
});
const device = ref(null); // Получение девайса из БД
const optionsValue = ref(null); // Выбор типа девайса
const responseRec = ref(false); // Получен ответ или нет (для вывода доп инпутов)
const deviceStore = useDevicesStore();
const itemStore = useItemsStore();
const toast = useToast();

const onSubmit = async () => {
  try {
    device.value = await deviceStore.getDeviceByPn(dto.value.pn);
    dto.value.device = device.value || { specification: {} };
    optionsValue.value = device.value?.type || null;
    responseRec.value = true;
  } catch (error) {
    console.error(error);
    toast.error("Произошла ошибка, свяжитесь с администратором");
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
    toast.success("Комплектующий добавлен");
  } catch (error) {
    console.error(error);
    toast.error(
      "Произошла ошибка, проверьте данные или свяжитесь с администратором"
    );
  }
};
const logs = ({ target, value }) => {
  dto.value.device.specification[target] = value;
};
</script>

<template>
  <div class="container">
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
            <option v-for="t in deviceTypes" :key="t.id" :value="t.type">
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
        <AddItemsFields v-model="dto.item.name" />
        <button class="btn btn-outline-secondary" type="submit">
          Создать устройство
        </button>
      </div>
    </form>
  </div>
</template>
