<template>
  <template v-if="filtered.length">
        <form @submit.prevent="onSubmit">
          <div class="mb-2" v-for="{ variables } in filtered" :key="variables.toString()">
            <div class="row justify-content-center mt-2">
              <div class="col-lg-8">
                <div class="" v-if="variables.includes('volume')">
                  <input
                    v-model.lazy="volume"
                    class="form-control"
                    min="0"
                    type="number"
                    placeholder="Введите емкость"
                  />
                </div>
              </div>
            </div>
            <div class="row justify-content-center mb-2" v-if="variables.includes('hhz')" >
              <div class="col-lg-4">
                <input v-model.lazy="firstHhz" type="number" class="form-control" placeholder="2" />
              </div>
              <div class="col-lg-4">
                <input v-model.lazy="secondHhz" type="number" class="form-control" placeholder="4.2" />
              </div>
            </div>
            <div class="row justify-content-center" v-if="variables.includes('socket')">
              <div class="col-lg-8">
                <BaseSelector v-model="socket" :options="specification.CPU.socket" />
              </div>
            </div>
            <div class="row justify-content-center text-center mt-2">
              <div class="col-lg-8">
                <button class="btn btn-dark" type="submit">Показать</button>
              </div>
            </div>
          </div>
        </form>

  </template>
</template>
<script lang="ts" setup>
import { fetchItemsParams } from "@/stores/items/types";
import { filteredTypes } from "@/utils/helpers";
import { computed, ref, watch } from "vue";

interface Props {
  value: string;
  specification: any;
  params?: fetchItemsParams;
  fetching: (params?: fetchItemsParams) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  specification: () => ({}),
  params: () => ({}),
});

const filtered = computed(() => filteredTypes.filter((t) => t.type.includes(props.value)));

const volume = ref("");
const socket = ref("");
const firstHhz = ref("");
const secondHhz = ref("");

watch(
  () => props.value,
  (_, oldValue) => {
    if (!oldValue) return;
    volume.value = "";
    socket.value = "";
    firstHhz.value = "";
    secondHhz.value = "";
  },
);

const onSubmit = () => {
  const data = {
    volume: volume.value,
    socket: socket.value,
    hhz: firstHhz.value && secondHhz.value ? [firstHhz.value, secondHhz.value] : firstHhz.value || secondHhz.value,
  };
  props.fetching({
    ...props.params,
    filter: {
      ...data,
    },
  });
};
</script>
