<script setup lang="ts">
import { Device } from "@/stores/devices/types";
import { deviceTypes } from "@/utils/helpers";
import { computed } from "vue";
import SpecificationField from "./SpecificationField.vue";

interface Props {
  type: string;
  disabled?: boolean;
  device?: Device | null;
  dto?: any;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  device: null,
  dto: () => ({}),
});

defineEmits({
  editSpecification: null,
});

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
      :specification="device?.specification[specification] || dto.device?.specification[specification] || null"
      :nameSpec="specification"
      @editSpecification="(v) => $emit('editSpecification', v)"
    />
  </div>
</template>
