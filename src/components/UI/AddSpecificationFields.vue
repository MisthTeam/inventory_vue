<script>
export default {
  name: "AddSpecFields",
};
</script>

<script setup>
import { types } from "@/utils/helpers";
defineProps({
  option: {
    type: String,
    required: true,
  },
  device: {
    type: Object || null,
    required: false,
  },
  dto: {
    type: Object,
    required: true,
  },
});
defineEmits(["editDevice"]);
</script>

<template>
  <div v-for="t in types" :key="t.id">
    <div class="input-group mb-3" v-if="t.type === option">
      <input
        type="text"
        v-for="spec of t.specification"
        :key="spec"
        class="form-control"
        id="floatingInput"
        :disabled="device"
        @input="
          $emit('editDevice', { value: $event.target.value, target: spec })
        "
        :value="
          (device && device.specification[spec]) ||
          (dto.device.specification && dto.device.specification[spec])
        "
        :placeholder="spec"
        :aria-label="spec"
      />
    </div>
  </div>
</template>
