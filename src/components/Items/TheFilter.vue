<template>
  <template v-if="filtered.length">
    <form @submit.prevent="onSubmit">
      <div v-for="{ variables } in filtered" :key="variables.toString()">
        <input
          v-if="variables.includes('volume')"
          v-model.lazy="volume"
          class="form-control"
          min="0"
          type="number"
          placeholder="Введите емкость"
        />

        <div v-if="variables.includes('hhz')">
          <input v-model.lazy="firstHhz" type="number" class="form-control" placeholder="от 2" />
          <input v-model.lazy="secondHhz" type="number" class="form-control" placeholder="до 4.2" />
        </div>

        <BaseSelector v-if="variables.includes('socket')" v-model="socket" :options="specification.CPU.socket" />
      </div>
      <button type="submit">Показать</button>
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
