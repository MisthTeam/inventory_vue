<script setup lang="ts">
import { useRouter } from "vue-router";
import { getItemsInfo } from "@/hooks/items";

const router = useRouter();

const { dashInfo, isLoading } = getItemsInfo();

const filteredBy = (id: number) => {
  router.push(`/items?filter=status=${id}`);
};
</script>

<template>
  <div class="container-fluid">
    <div v-if="!isLoading" class="row mt-6">
      <div class="col-xl-6 col-lg-6 col-md-6 col-12">
        <div class="card m-3 green">
          <div class="card-body">
            <h5 class="card-title">Комплектующие</h5>
            <h4 class="card-text text-end">{{ dashInfo.devices }}</h4>
          </div>
        </div>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-6 col-12">
        <div class="card m-3 devices">
          <div class="card-body">
            <h5 class="card-title">Девайсы</h5>
            <h4 class="card-text text-end">{{ dashInfo.devices }}</h4>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 d-md-block col-12 d-none cursor-pointer" @click="filteredBy(1)">
        <div class="card m-3 free-compl">
          <div class="card-body">
            <h5 class="card-title">Свободно комплектующих</h5>
            <h4 class="card-text text-end">{{ dashInfo.clear }}</h4>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 d-md-block col-12 d-none cursor-pointer" @click="filteredBy(2)">
        <div class="card m-3 used-compl">
          <div class="card-body">
            <h5 class="card-title">Используется комплектующих</h5>
            <h4 class="card-text text-end">{{ dashInfo.used }}</h4>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 d-md-block col-12 d-none cursor-pointer" @click="filteredBy(4)">
        <div class="card m-3 crash-compl">
          <div class="card-body">
            <h5 class="card-title">Сломано комплектующих</h5>
            <h4 class="card-text text-end">{{ dashInfo.danger }}</h4>
          </div>
        </div>
      </div>
    </div>
    <LoadingSpinner v-else />
    <div class="row justify-content-center">
      <div class="col-xl-5 col-lg-5 col-md-12 col-12">
        <h5 class="text-center">Последние комплектующие</h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">S\N</th>
              <th scope="col">Тип устройства</th>
              <th scope="col" class="d-sm-block d-none">Сотрудник</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td class="d-sm-block d-none">4</td>
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
.cursor-pointer {
  cursor: pointer;
}
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
