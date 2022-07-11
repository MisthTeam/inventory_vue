<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col" class="col-4">P/N</th>
        <th scope="col" class="col-1">Тип устройства</th>
        <th scope="col" class="col-2">Дата</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody class="align-middle">
      <DeviceItem v-for="deviceItem in devices" :key="deviceItem.id" :device="deviceItem" @openModal="openModal" />
      <div v-show="!devices.length" class="text-center">
        <h5>Устройства не найдены</h5>
      </div>
    </tbody>
  </table>
  <BaseModal name="Изменение устройства" :isOpen="isOpenModal" @close="modalCancel" @ok="modalOk">
    <template v-if="isOpenModal" #default>
      <template v-if="dto">
        <div class="form-floating mb-3">
          <input id="floatingInput2" v-model="dto.pn" type="text" class="form-control" placeholder="P/N" />

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
          <SpecificationsList :type="dto.type" :device="dto" :dto="dto" @editSpecification="changeSpecification" />
        </div>
      </template>
    </template>
    <template v-else #default>
      <div class="placeholder-glow" aria-hidden="true">
        <div><input class="placeholder col-12" /></div>
        <div><select class="placeholder col-12"></select></div>
        <div>
          <span class="placeholder col-12"></span>
        </div>
      </div>
    </template>
  </BaseModal>
</template>
<script setup lang="ts">
import { editDevice } from "@/hooks/devices";
import { Device, updateSpecification } from "@/stores/devices/types";
import { deviceTypes } from "@/utils/helpers";
import { ref, watch } from "vue";
import DeviceItem from "./DeviceItem.vue";

interface Props {
  devices: Array<Device>;
}
defineProps<Props>();

const { editing } = editDevice();

const isOpenModal = ref(false);
const dto = ref<Device>({} as Device);
const device = ref<Device>({} as Device);

const openModal = (d: Device) => {
  dto.value = { ...d };
  device.value = d;
  isOpenModal.value = true;
};

const modalCancel = () => {
  if (isOpenModal.value) {
    isOpenModal.value = false;
    dto.value = {} as Device;
  }
};

const modalOk = () => dto.value && editing(dto.value); // Изменение девайса

watch(
  () => dto.value.type,
  async (_, oldValue) => {
    if (oldValue) {
      dto.value && (dto.value.specification = {});
    }
  },
);

// Изменение спецификации
const changeSpecification = ({ target, value }: updateSpecification) => {
  dto.value.specification = { ...dto.value.specification, [target]: value };
};
</script>
