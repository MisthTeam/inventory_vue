<template>
  <div
    v-for="attribute in attributes"
    :key="attribute.id"
    class="form-floating mb-3"
  >
    <AttributeField
      @updateAttr="(v) => $emit('updateAttr', v)"
      :disabled="disabled"
      :attribute="attribute"
    />
  </div>
</template>

<script setup>
import AttributeField from "./AttributeField.vue";
defineProps({
  attributes: {
    type: Array,
    requried: true,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

defineEmits({
  updateAttr: null,
});
</script>

<script>
export default {
  name: "AttributesList",
};
</script>
