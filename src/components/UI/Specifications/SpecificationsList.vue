<script setup lang="ts">
import { computed } from "vue";
import { Device, updateSpecification } from "@/stores/devices/types";
import { deviceTypes } from "@/utils/helpers";
import SpecificationField from "./SpecificationField.vue";

interface Props {
  type: string;
  disabled?: boolean;
  device?: Device | null;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  device: null,
});

defineEmits<{
  (e: "editSpecification", spec: updateSpecification): void;
}>();

const deviceType = computed(() => deviceTypes.find((d) => d.type === props.type));
</script>

<script lang="ts">
export default {
  name: "SpecificationsList",
};
</script>

<template>
  <div v-if="deviceType" class="input-group justify-content-between mb-3">
    <SpecificationField
      v-for="(specification, i) of deviceType.specification"
      :key="i"
      :disabled="disabled"
      :specification="device?.specification[specification] || ''"
      :nameSpec="specification"
      @editSpecification="(v) => $emit('editSpecification', v)"
    />
  </div>
</template>
