<script setup lang="ts">
import { deleteItem, editItem, getItem, getStatused } from "@/hooks/items";
import { checkUserRole } from "@/hooks/user";
import { useUserStore } from "@/stores";
import { UpdateAttr } from "@/stores/attrubutes/types";
import { watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Item } from "@/stores/items/types";
import { filterByClick } from "@/utils/helpers/filterByClick";
import { stringify } from "qs";

const route = useRoute();
const router = useRouter();
const isEditing = ref(false);

const user = useUserStore();
const { isHasRole: isHasDelete } = checkUserRole(user.getUser, "items:delete");
const { isHasRole: isHasEdit } = checkUserRole(user.getUser, "items:edit");
const { item, isLoading } = getItem(route.params.id as string);
const { deleteIt, isDeleteLoading } = deleteItem();
const { isUpdateLoading, editIt } = editItem(isEditing);
const { statusList } = getStatused();
const DTO = ref<Item>({} as Item);

// Изменение атрибутов
const changeAttributes = ({ attrId, value: newValue }: UpdateAttr) => {
  const attr = DTO.value.attributes.find((attr) => attr.id === attrId);
  if (attr) {
    Object.assign(attr, {
      value: newValue,
    });
  }
};

const sortBySpecification = (event: PointerEvent, infoType: string) => {
  const element = event.target as Element;
  if (!element) return;
  if (!item.value) return;
  if (["capacity", "unit"].includes(element.id)) {
    const { filterObject, type } = filterByClick(item.value, infoType, item.value.device.type);
    router.push({
      path: "/items",
      query: {
        filter: stringify(filterObject),
        sorted: type ?? "",
      },
    });
  } else {
    const { filterObject, type } = filterByClick(item.value, infoType, item.value.device.type, element.id);
    router.push({
      path: "/items",
      query: {
        filter: stringify(filterObject),
        sorted: type ?? "",
      },
    });
  }
};

const sortByAttribute = (event: PointerEvent) => {
  const element = event.target as Element;
  if (!element) return;
  if (!item.value) return;
  if (element.id === "Profile") {
    const attr = DTO.value.attributes.find((attr) => attr.name === element.id);
    if (!attr || !attr.value) return;
    router.push({
      path: "/items",
      query: {
        filter: stringify({
          profile: attr.value,
        }),
        sorted: item.value.device.type,
      },
    });
  }
};

const sortByPN = () => {
  if (!item.value) return;
  const { search } = filterByClick(item.value, "PN", item.value.device.pn);
  router.push({
    path: "/items",
    query: {
      search,
    },
  });
};

const sortByType = () => {
  if (!item.value) return;
  const { type } = filterByClick(item.value, "type", item.value.device.type);
  router.push({
    path: "/items",
    query: {
      sorted: type,
    },
  });
};

watch(item, (newItem) => {
  DTO.value = JSON.parse(JSON.stringify(newItem));
});
</script>
<template>
  <LoadingSpinner v-if="isLoading" />
  <div v-else class="container">
    <div v-if="item && statusList" class="row justify-content-center align-items-center vh-100">
      <div class="row justify-content-center">
        <div class="col-xl-4 col-lg-4 col-md-6 col-12">
          <BaseButton
            v-if="!isEditing"
            class="w-100 btn-warning"
            :class="{
              disabled: !isHasEdit,
            }"
            @clickButton="() => (isEditing = !isEditing)"
          >
            Изменить
          </BaseButton>
          <BaseButton v-else :disabled="isUpdateLoading" class="w-100 btn-success" @clickButton="editIt(DTO.id, DTO)">
            Сохранить
          </BaseButton>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-md-0 mt-2">
          <BaseButton
            :disabled="isDeleteLoading"
            class="w-100 btn-danger"
            :class="{
              disabled: !isHasDelete,
            }"
            @clickButton="deleteIt(DTO.id)"
          >
            Удалить
          </BaseButton>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-12 col-12 mt-3">
          <div class="form-floating mb-3">
            <input
              id="floatingInput"
              v-model="DTO.meta.name"
              type="text"
              class="form-control"
              required
              :disabled="!isEditing"
              placeholder="S/N"
            />
            <label for="floatingInput">S/N</label>
          </div>
          <div class="form-floating mb-3" @click="sortByPN">
            <input
              id="floatingInput2"
              type="text"
              class="form-control"
              :value="item.device.pn"
              disabled
              placeholder="P/N"
            />

            <label for="floatingInput2">P/N</label>
          </div>
          <AttributesList
            :attributes="DTO.attributes"
            disabled
            @click="sortByAttribute"
            @updateAttr="changeAttributes"
          />
        </div>
        <div class="col-xl-8 col-lg-8 col-md-12 col-12" @click="sortByType">
          <div class="form-floating mb-3">
            <select class="form-select" disabled aria-label="Device type">
              <option selected :value="DTO.device.type">
                {{ DTO.device.type }}
              </option>
            </select>
            <label for="floatingInput">Device type</label>
          </div>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <SpecificationsList
            disabled
            :type="DTO.device.type"
            :device="DTO.device"
            @click="(event: PointerEvent) => sortBySpecification(event, 'info')"
          />
        </div>
        <div class="col-xl-8 col-lg-8 col-md-12 col-12">
          <div class="form-floating mb-3">
            <select v-model="DTO.status.id" class="form-select" :disabled="!isEditing" aria-label="Change status">
              <option
                v-for="status in statusList"
                :key="status.id"
                :value="status.id"
                :selected="status.id === item.status.id"
              >
                {{ status.name }}
              </option>
            </select>
            <label for="floatingInput">Change status</label>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row justify-content-center align-items-center vh-100">
      <div class="col-12 text-center">
        <h2>Предмета нету</h2>
      </div>
    </div>
  </div>
</template>
