<template>
  <div v-for="attribute in attributes" :key="attribute.id" class="form-floating mb-3">
    <AttributeItem :disabled="disabled" :attribute="attribute" @updateAttr="(v) => $emit('updateAttr', v)" />
  </div>
</template>

<script setup lang="ts">
import { UpdateAttr } from "@/stores/devices/types";
import { AttributeField } from "@/stores/items/types";

import AttributeItem from "./AttributeField.vue";

interface Props {
  attributes?: Array<AttributeField>;
  disabled?: boolean;
}
defineProps<Props>();

defineEmits<{
  (e: "updateAttr", value: UpdateAttr): void;
}>();
</script>

<script lang="ts">
export default {
  name: "AttributesList",
};
</script>
