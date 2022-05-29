<script>
export default {
  name: "SpecFields",
};
</script>

<script setup>
import { deviceTypes } from "@/utils/helpers";
import { computed } from "vue";
const props = defineProps({
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
    required: false,
    default: () => {},
  },
});
defineEmits(["editDevice"]);
const deviceType = computed(() =>
  deviceTypes.find((d) => d.type === props.option)
);
</script>

<template>
  <div v-if="deviceType" class="input-group justify-content-between">
    <div
      class="form-floating"
      v-for="spec of deviceType.specification"
      :key="spec"
    >
      <input
        id="floatingInput"
        type="text"
        required
        class="form-control"
        style="max-width: 180px"
        :disabled="disabled"
        :value="device?.specification[spec] || dto.device?.specification[spec]"
        :placeholder="spec"
        :aria-label="spec"
        @input="
          $emit('editDevice', { value: $event.target.value, target: spec })
        "
      />
      <label for="floatingInput">{{ spec }}</label>
    </div>
  </div>
</template>
