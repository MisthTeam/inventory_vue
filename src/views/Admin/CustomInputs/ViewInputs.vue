<template>
  <div class="row justify-content-center">
    <div class="col-lg-7 col-12">
      <BaseButton @click="openModal" type="button" class="w-100 btn-success"> Добавить поле </BaseButton>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-lg-7 col-12">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Название</th>
            <th scope="col">Тип</th>
            <th scope="col">Для</th>
          </tr>
        </thead>
        <tbody class="align-middle">
          <tr>
            <td>test</td>
            <td>text</td>
            <td>SSD</td>
            <td class="col-3 text-center">
              <BaseButton class="btn-danger">
                <i class="bi bi-trash-fill" />
              </BaseButton>
              <BaseButton type="button" class="btn-warning m-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i class="bi bi-pencil-fill" />
              </BaseButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <BaseModal name="Изменение устройства" :isOpen="isOpenModal" @close="modalCancel" @ok="modalOk">
    <template v-if="isOpenModal" #default>
      <BaseButton @click="openModal" type="button" class="w-100 btn-success"> Добавить поле </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpenModal = ref(false);

const openModal = () => {
  isOpenModal.value = true;
};

const modalCancel = () => {
  if (isOpenModal.value) {
    isOpenModal.value = false;
  }
};

const modalOk = () => (isOpenModal.value = false);
</script>
