<template>
  <button :type="type" class="btn" :disabled="disabled" @click="$emit('clickButton')">
    <span v-if="disabled" class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
    <b v-if="!hideText"> <slot /> </b>
  </button>
</template>
<script lang="ts">
export default {
  name: "BaseButton",
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    hideText: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: "button",
    },
  },
  emits: {
    clickButton: null,
  },
};
</script>
