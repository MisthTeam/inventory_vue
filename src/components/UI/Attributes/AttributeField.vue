<script setup lang="ts">
import { Attribute, UpdateAttr } from "@/stores/attrubutes/types";

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
  <div class="form-floating mb-3">
    <input
      v-if="attribute.meta.type === 'text'"
      :id="attribute.name"
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
      :id="attribute.name"
      :disabled="disabled"
      class="form-select"
      :value="attribute.value"
      @change="updateAttr({ attrId: attribute.id, value: ($event.target as HTMLSelectElement).value })"
    >
      <option v-for="list in attribute.meta.list" :key="list" :selected="list === attribute.value" :value="list">
        {{ list }}
      </option>
    </select>
    <label :for="attribute.name">{{ attribute.name }}</label>
  </div>
</template>
