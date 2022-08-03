<template>
  <nav v-if="isLoggenIn" class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/" replace> Inventory </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" aria-current="page" class="nav-link"> Главная </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/items" aria-current="page" class="nav-link"> Комплектующие </router-link>
          </li>
        </ul>
        <div class="d-flex">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a
                id="navbarDropdownMenuLink"
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ user?.login }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li v-if="hasOneIsRoles">
                  <router-link to="/admin/device" aria-current="page" class="dropdown-item">
                    Панель администратора
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/logout"> Выход </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <form class="d-flex" @submit.prevent="onSearch">
          <div class="input-group-prepend show">
            <OnClickOutside @trigger="closePopup">
              <input
                v-model="search"
                :disabled="isLoading"
                class="form-control me-2"
                type="search"
                placeholder="Поиск"
                aria-label="Search"
                @click="openPopup"
              />
              <div
                class="dropdown-menu"
                :class="{ show: showPopup }"
                x-placement="bottom-start"
                style="position: absolute"
              >
                <template v-if="result">
                  <router-link
                    v-for="item in result.splice(0, 10)"
                    :key="item.id"
                    :to="{ path: `/items/${item.id}` }"
                    class="dropdown-item"
                  >
                    {{ item.meta.name }}
                  </router-link>
                </template>
              </div>
            </OnClickOutside>
          </div>
          <BaseButton :hideText="isLoading" :disabled="isLoading" type="submit" class="btn-outline-success">
            Найти
          </BaseButton>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Item } from "@/stores/items/types";
import { User } from "@/stores/user/types";
import { api } from "@/utils/api";
import { AxiosResponse } from "axios";
import { ref, watch } from "vue";
import { OnClickOutside } from "@vueuse/components";
import { checkUserRole } from "@/hooks/user";

const search = ref("");
const result = ref<Item[] | null>(null);
const isLoading = ref(false);
const showPopup = ref(false);

const props = withDefaults(
  defineProps<{
    user: User | null;
    isLoggenIn: boolean;
  }>(),
  {
    user: null,
    isLoggenIn: false,
  },
);
const hasOneIsRoles = ref(false);

watch(
  () => props.user,
  (value) => {
    if (value) {
      const { isHasRole } = checkUserRole(props.user, ["users:list", "attr:list", "devices:list"]);
      hasOneIsRoles.value = isHasRole.value;
    }
  },
);

const onSearch = async () => {
  try {
    isLoading.value = true;
    const searchRes = await api.post<AxiosResponse, Item[]>("search", {
      text: search.value,
    });
    if (searchRes.length) {
      result.value = searchRes;
      showPopup.value = true;
    }
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
};

watch(search, (value) => {
  if (!value.length) {
    result.value = null;
    showPopup.value = false;
  }
});

const openPopup = () => {
  if (result.value) showPopup.value = true;
};

const closePopup = () => {
  if (showPopup.value) showPopup.value = false;
};
</script>
