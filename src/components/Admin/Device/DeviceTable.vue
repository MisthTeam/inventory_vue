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
        v-for="(device, index) in devices"
        :key="device.id"
        :device="device"
        @deleteDevice="$emit('deleteDevice', index)"
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
    @close="modalClose"
    @ok="modalOk"
  >
    <template #default v-if="isOpenModal">
      <div class="form-floating mb-3">
        <input
          id="floatingInput2"
          type="text"
          class="form-control"
          v-model="getDevice.pn"
          placeholder="P/N"
        />

        <label for="floatingInput2">P/N</label>
      </div>
      <div class="input-group justify-content-between mb-3">
        <SpecFields
          :option="getDevice.type"
          :device="getDevice"
          @editDevice="editDeviceEmit"
        />
      </div>
    </template>
  </BaseModal>
</template>
<script setup>
import { ref } from "vue";
import { editDevice } from "../../../hooks/devices";
import DeviceItem from "./DeviceItem.vue";
defineProps({
  devices: {
    type: Array,
    required: true,
  },
});
defineEmits(["deleteDevice"]);

const { isEditingLoading, editing } = editDevice();

const isOpenModal = ref(false);
const getDevice = ref(null);
const openModal = (device) => {
  getDevice.value = device;
  isOpenModal.value = true;
};

const modalClose = () => {
  isOpenModal.value = false;
};

const modalOk = () => editing(getDevice.value); //Изменение девайса

const editDeviceEmit = ({ target, value }) => {
  getDevice.value.specification[target] = value;
};
</script>
