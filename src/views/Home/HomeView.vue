<template>
  <div class="container-fluid">
    <div class="row mt-6">
      <div class="col-xl-3 col-lg-4 col-md-6 col-12">
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
    </div>
  </div>
</template>

<style scoped>
.green {
  background-color: #b4ffc6;
}
</style>

<script setup>
import useItemsStore from "@/stores/items";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const itemsStore = useItemsStore();
const itemsRef = storeToRefs(itemsStore).items;
const fetching = async () => {
  try {
    const items = await itemsStore.getItems();
    itemsRef.value = items;
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetching);
</script>
