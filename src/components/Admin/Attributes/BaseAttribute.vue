<template>
  <tbody class="align-middle">
    <tr>
      <td>{{ attribute.name }}</td>
      <td>{{ attribute.meta.type }}</td>
      <td>{{ attribute.device_type }}</td>
      <td class="col-3 text-center">
        <BaseButton
          class="btn-danger"
          :class="{
            disabled: !isDelAttr,
          }"
          :disabled="isLoading"
          @click="deleteAttr"
        >
          <i class="bi bi-trash-fill" />
        </BaseButton>
        <BaseButton
          type="button"
          class="btn-warning m-1"
          :class="{
            disabled: !isEditAttr,
          }"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          @click="$emit('openModal', attribute)"
        >
          <i class="bi bi-pencil-fill" />
        </BaseButton>
      </td>
    </tr>
  </tbody>
</template>
<script lang="ts" setup>
import { deleteAttribute } from "@/hooks/attributes";
import { Attribute } from "@/stores/attrubutes/types";
import { checkUserRole } from "@/hooks/user";
import { useUserStore } from "@/stores";

const user = useUserStore();
const { isHasRole: isEditAttr } = checkUserRole(user.getUser, "attr:edit");
const { isHasRole: isDelAttr } = checkUserRole(user.getUser, "attr:delete");

interface Props {
  attribute: Attribute;
}

defineEmits<{
  (event: "openModal", value: Attribute): void;
}>();

const props = defineProps<Props>();

const { isLoading, deleting } = deleteAttribute();

const deleteAttr = async () => deleting(props.attribute.id);
</script>
