<template>
  <button :type="type" class="btn" :disabled="disabled" @click="$emit('clickButton')">
    <span v-if="disabled" class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
    <b v-if="!hideText"> <slot /> </b>
  </button>
</template>
<script lang="ts">
export default {
  name: "BaseButton",
};
</script>

<script lang="ts" setup>
interface Props {
  disabled?: boolean;
  hideText?: boolean;
  type?: "button" | "submit" | "reset";
}

withDefaults(defineProps<Props>(), {
  type: "button",
  hideText: false,
  disabled: false,
});

defineEmits<{
  (event: "clickButton"): void;
}>();
</script>
