<script setup lang="ts">
import { Attribute } from "@/stores/attrubutes/types";
import { UpdateAttr } from "@/stores/attrubutes/types";

interface Props {
  attribute: Attribute;
  disabled?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "updateAttr", value: UpdateAttr): void;
}>();

const updateAttr = (values: UpdateAttr) => emit("updateAttr", values);
</script>

<script lang="ts">
export default {
  name: "AttributeField",
};
</script>

<template>
  <input
    v-if="attribute.meta.type === 'text'"
    id="floatingInput"
    type="text"
    class="form-control"
    :value="attribute.value"
    required
    :disabled="disabled"
    :placeholder="attribute.name"
    @input="updateAttr({ attrId: attribute.id, value: ($event.target as HTMLInputElement).value })"
  />

  <select
    v-if="attribute.meta.type === 'select'"
    :disabled="disabled"
    class="form-select"
    :value="attribute.value"
    @change="updateAttr({ attrId: attribute.id, value: ($event.target as HTMLSelectElement).value })"
  >
    <option v-for="list in attribute.meta.list" :key="list" :selected="list === attribute.value" :value="list">
      {{ list }}
    </option>
  </select>
  <label for="floatingInput">{{ attribute.name }}</label>
</template>
