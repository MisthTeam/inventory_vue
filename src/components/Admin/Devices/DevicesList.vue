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
          <SpecificationsList :type="dto.type" :device="dto" @editSpecification="changeSpecification" />
        </div>
      </template>
    </template>
  </BaseModal>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { editDevice } from "@/hooks/devices";
import { deviceTypes } from "@/utils/helpers";
import { Device, updateSpecification } from "@/stores/devices/types";
import DeviceItem from "./DeviceItem.vue";

interface Props {
  devices: Array<Device>;
}
defineProps<Props>();

defineEmits(["deleteDevice"]);

const { editing } = editDevice();

const isOpenModal = ref(false);
const dto = ref<Device>({} as Device);

const openModal = (device: Device) => {
  dto.value = { ...device };
  isOpenModal.value = true;
};

const modalCancel = () => {
  isOpenModal.value = false;
  dto.value = {} as Device;
};

const modalOk = () => dto.value && editing(dto.value); // Изменение девайса

watch(
  () => dto.value?.type,
  async (_, oldValue) => {
    if (oldValue) {
      dto.value && (dto.value.specification = {});
    }
  },
);

const changeSpecification = ({ target, value }: updateSpecification) => {
  Object.assign(dto.value.specification, {
    [target]: value,
  });
};
</script>
