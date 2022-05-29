<template>
  <div class="container">
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
            <tr>
              <td>123123</td>
              <td>SSD</td>
              <td class="">misthntism</td>
              <td class="">29 мая 2022</td>
              <td class="text-end">
                <button type="button" class="btn btn-danger">
                  <i class="bi bi-trash-fill"></i>
                </button>
                <!-- вызов модалки -->
                <button
                  type="button"
                  class="btn btn-warning ms-lg-1 ms-md-1 ms-0 mt-xl-0 mt-lg-1 mt-md-0 mt-sm-1 mt-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i class="bi bi-pencil-fill"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- модалка -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Изменение девайса
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- форма -->
            <div class="form-floating mb-3">
              <input
                id="floatingInput2"
                type="text"
                class="form-control"
                :value="KSDHDSFUH"
                placeholder="P/N"
              />
              <label for="floatingInput2">P/N</label>
            </div>
            <div class="input-group justify-content-between mb-3">
              <input type="text" required class="form-control" :value="123" />
              <input type="text" required class="form-control" :value="123" />
              <input type="text" required class="form-control" :value="123" />
            </div>
            <!-- конец формы -->
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Отмена
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- конец модалки -->
  </div>
</template>
<script setup></script>
<style></style>
