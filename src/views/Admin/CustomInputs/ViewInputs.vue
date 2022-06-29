<template>
  <div class="row justify-content-center">
    <div class="col-lg-7 col-12">
      <BaseButton
        type="button"
        class="w-100 btn-success"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        @click="openModal"
      >
        Добавить поле
      </BaseButton>
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
      <div class="row g-2">
        <div class="col-md">
          <div class="form-floating">
            <input type="text" class="form-control" id="floatingInputGrid" />
            <label for="floatingInputGrid">Название поля</label>
          </div>
        </div>
        <div class="col-md">
          <div class="form-floating">
            <select class="form-select" id="floatingSelectGrid">
              <option selected>Выберете...</option>
              <option value="1">text</option>
              <option value="2">integer</option>
              <option value="3">select</option>
            </select>
            <label for="floatingSelectGrid">Тип будущего поля</label>
          </div>
        </div>
      </div>
      <div class="row"></div>
      <!-- <label for="inputName" class="col-sm-2 col-form-label">Тип поля</label>
      <BaseSelector :options="['text', 'selctor', 'integer']" disableFirstElement /> -->
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
