<template>
  <div class="form-floating mb-3">
    <input
      id="floatingInput"
      type="text"
      class="form-control"
      :value="modelValue"
      required
      :disabled="disabled"
      placeholder="S/N"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <label for="floatingInput">S/N</label>
  </div>
  <div v-if="item?.device" class="form-floating mb-3">
    <input id="floatingInput2" type="text" class="form-control" :value="item.device.pn" disabled placeholder="P/N" />

    <label for="floatingInput2">P/N</label>
  </div>
</template>

<script setup lang="ts">
import { Item } from "@/stores/items/types";

interface Props {
  modelValue?: string;
  disabled?: boolean;
  item?: Item | null;
}

withDefaults(defineProps<Props>(), {
  item: null,
  disabled: false,
});
defineEmits(["update:modelValue"]);
</script>

<script lang="ts">
export default {
  name: "ItemsFields",
};
</script>
