<script setup lang="ts">
import { AttributeField } from "@/stores/items/types";
import { UpdateAttr } from "@/stores/devices/types";

interface Props {
  attribute: AttributeField;
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
    <option v-for="l in attribute.meta.list" :key="l" :selected="l === attribute.value" :value="l">
      {{ l }}
    </option>
  </select>
  <label for="floatingInput">{{ attribute.name }}</label>
</template>
