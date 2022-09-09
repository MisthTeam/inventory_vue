<template>
  <div v-if="attributes.length">
    <AttributeItem
      v-for="attribute in attributes"
      :key="attribute.id"
      :disabled="disabled"
      :attribute="attribute"
      @updateAttr="(v) => $emit('updateAttr', v)"
    />
  </div>
</template>

<script setup lang="ts">
import { UpdateAttr } from "@/stores/attrubutes/types";
import { Attribute } from "@/stores/attrubutes/types";

import AttributeItem from "./AttributeField.vue";

interface Props {
  attributes?: Array<Attribute>;
  disabled?: boolean;
}
withDefaults(defineProps<Props>(), {
  attributes: () => [],
  disabled: false,
});

defineEmits<{
  (e: "updateAttr", value: UpdateAttr): void;
}>();
</script>

<script lang="ts">
export default {
  name: "AttributesList",
};
</script>
