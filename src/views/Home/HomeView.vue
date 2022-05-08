<template>
  <div class="container-fluid">
    <div class="row mt-6">
      <div class="col-xl-6 col-lg-6 col-md-6 col-12">
        <div class="card m-3 green">
          <div class="card-body">
            <h5 class="card-title">Комплектующие</h5>
            <h4 class="card-text text-end" v-if="itemsRef">
              {{ itemsRef.length }}
            </h4>
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          </div>
        </div>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-6 col-12">
        <div class="card m-3 devices">
          <div class="card-body">
            <h5 class="card-title">Девайсы</h5>
            <h4 class="card-text text-end" v-if="itemsRef">
              {{ itemsRef.length }}
            </h4>
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 d-md-block col-12 d-none">
        <div class="card m-3 free-compl">
          <div class="card-body">
            <h5 class="card-title">Свободно комплектующих</h5>
            <h4 class="card-text text-end" v-if="itemsRef">
              {{ itemsRef.length }}
            </h4>
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 d-md-block col-12 d-none">
        <div class="card m-3 used-compl">
          <div class="card-body">
            <h5 class="card-title">Используется комплектующих</h5>
            <h4 class="card-text text-end" v-if="itemsRef">
              {{ itemsRef.length }}
            </h4>
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 d-md-block col-12 d-none">
        <div class="card m-3 crash-compl">
          <div class="card-body">
            <h5 class="card-title">Сломано комплектующих</h5>
            <h4 class="card-text text-end" v-if="itemsRef">
              {{ itemsRef.length }}
            </h4>
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-xl-5 col-lg-5 col-md-12 col-12">
        <h5 class="text-center">Последние комплектующие</h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Название</th>
              <th scope="col">Тип устройства</th>
              <th scope="col">Инфо</th>
              <th scope="col">Сотрудник</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-xl-5 col-lg-5 col-md-12 col-12">
        <h5 class="text-center">Логи</h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Тип действия</th>
              <th scope="col">Сотрудник</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.green {
  background-color: #bffffd;
  color: #3b6161;
}
.devices {
  background-color: #ffffae;
  color: #64642f;
}
.free-compl {
  background-color: #c8fdd5;
  color: #346b41;
}
.used-compl {
  background-color: #f8e7be;
  color: #74643f;
}
.crash-compl {
  background-color: #fec7c7;
  color: #733535;
}
</style>

<script setup>
import { getItems } from "@/hooks/items";

const { itemsRef } = getItems();
</script>
