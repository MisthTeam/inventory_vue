<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col" class="col-4">P/N</th>
        <th scope="col" class="col-1">Тип устройства</th>
        <th scope="col" class="col-2">Юзер</th>
        <th scope="col" class="col-2">Дата</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <DeviceItem
        v-for="device in devices"
        :key="device.id"
        :device="device"
        @deleteDevice="$emit('deleteDevice', device.id)"
        @openModal="openModal"
      />
      <div v-show="!devices.length" class="text-center">
        <h5>Устройства не найдены</h5>
      </div>
    </tbody>
  </table>
  <BaseModal
    name="Изменение устройства"
    :isOpen="isOpenModal"
    @close="modalCancel"
    @ok="modalOk"
  >
    <template #default v-if="isOpenModal">
      <div class="form-floating mb-3">
        <input
          id="floatingInput2"
          type="text"
          class="form-control"
          v-model="dto.pn"
          placeholder="P/N"
        />

        <label for="floatingInput2">P/N</label>
      </div>

      <div class="form-floating mb-3">
        <select v-model="dto.type" class="form-select" aria-label="Device type">
          <option
            v-for="_type in deviceTypes"
            :key="_type.id"
            :value="_type.type"
            :selected="_type.type === dto.type"
          >
            {{ _type.type }}
          </option>
        </select>
        <label for="floatingInput">Device type</label>
      </div>

      <div class="input-group justify-content-between mb-3">
        <SpecificationsList
          :type="dto.type"
          :device="dto"
          @editSpecification="changeSpecification"
        />
      </div>
    </template>
  </BaseModal>
</template>
<script setup>
import { ref, watch } from "vue";
import { editDevice } from "../../../hooks/devices";
import { deviceTypes } from "../../../utils/helpers";
import DeviceItem from "./DeviceItem.vue";

defineProps({
  devices: {
    type: Array,
    required: true,
  },
});
defineEmits(["deleteDevice"]);

const { editing } = editDevice();

const isOpenModal = ref(false);
const dto = ref(null);

const openModal = (device) => {
  dto.value = { ...device };
  isOpenModal.value = true;
};

const modalCancel = () => {
  isOpenModal.value = false;
  dto.value = null;
};

const modalOk = () => editing(dto.value); // Изменение девайса

watch(
  () => dto.value?.type,
  async (_, oldValue) => {
    if (oldValue) {
      dto.value && (dto.value.specification = {});
    }
  }
);

// Изменение спецификации
const changeSpecification = ({ target, value }) =>
  Object.assign(dto.value.specification, {
    [target]: value,
  });
</script>
