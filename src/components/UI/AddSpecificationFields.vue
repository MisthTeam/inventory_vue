<script>
export default {
  name: "AddSpecFields",
};
</script>

<script setup>
import { deviceTypes } from "@/utils/helpers";
defineProps({
  option: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  device: {
    type: Object,
    required: false,
    default: null,
  },
  dto: {
    type: Object,
    required: true,
  },
});
defineEmits(["editDevice"]);
</script>

<template>
  <div v-for="t in deviceTypes" :key="t.id">
    <div v-if="t.type === option" class="input-group mb-3">
      <input
        v-for="spec of t.specification"
        id="floatingInput"
        :key="spec"
        type="text"
        class="form-control"
        :disabled="disabled"
        :value="device?.specification[spec] || dto.device?.specification[spec]"
        :placeholder="spec"
        :aria-label="spec"
        @input="
          $emit('editDevice', { value: $event.target.value, target: spec })
        "
      />
    </div>
  </div>
</template>
