<script setup>
import { getItems } from "@/hooks";
import { useRouter } from "vue-router";
import { types } from "@/utils/helpers";
import { computed, ref } from "vue";
const router = useRouter();
const toItem = (id) => {
  router.push(`/item/${id}`);
};
const { itemsRef } = getItems();
const sortedValue = ref("");
const sortedItems = computed(() => {
  return [...itemsRef.value]?.filter((el) => {
    console.log(el);
    return el.device.type.indexOf(sortedValue.value) > -1;
  });
});
</script>
<template>
  <div class="container mt-6" v-if="itemsRef">
    <div class="row justify-content-center">
      <div class="col-xl-8 col-lg-8 col-md-12 col-12">
        <router-link
          :to="{ path: `/items/add` }"
          type="button"
          class="btn btn-block btn-dark"
        >
          Добавить комплектующий
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2">
        <Selector v-model="sortedValue" :options="types" />
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2">
        <input
          type="text"
          class="form-control"
          required
          placeholder="Поиск"
          aria-label="enter pn"
          aria-describedby="button-addon2"
        />
      </div>
    </div>
    <div class="row justify-content-center mt-2">
      <div class="col-xl-8 col-lg-8 col-md-12 col-12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Название</th>
              <th scope="col">Тип устройства</th>
              <th scope="col">Инфо</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in sortedItems"
              :key="item.id"
              @click="toItem(item.id)"
            >
              <td>{{ item.meta?.name || "nope" }}</td>
              <td>{{ item.device.type }}</td>
              <td>{{ item.device.specification.volume }}</td>
              <td>{{ item.user.login }}</td>
              <td>
                <!-- {{ convertTime(item.created_at) }} -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <router-view />
</template>
<style scoped>
tbody tr:hover {
  background-color: #212529;
  color: white;
  cursor: pointer;
}
</style>
