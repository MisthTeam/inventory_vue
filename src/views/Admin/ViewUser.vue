<template>
  <div class="container-fluid">
    <div class="row">
      <AdminNavbar
        :pages="adminPages"
        v-model:currentPage="currentPage"
        disabled
      />
      <div class="col mt-6 ml-c">
        <!-- 
    вся эта страница должна открываться при клике на пользователя из талицы
 -->
        <div class="row justify-content-center">
          <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2 text-center">
            <h4>Пользователи</h4>
          </div>
        </div>
        <div class="row justify-content-center">
          <!-- 
          Основной контент страницы, первый кол отвечает за сам профиль,
          выводит некоторые данные
       -->
          <div class="col-xl-3 col-lg-2 col-md-12 col-12 mt-2">
            <div class="row">
              <div class="col">
                <h4>Пользователь</h4>
                <h6>misthntism</h6>
                <h6 class="text-muted">cblpgamer@yandex.ru</h6>
                <div class="list-group shadow ps-0 mt-4">
                  <button
                    type="button"
                    class="list-group-item list-group-item-action"
                    aria-current="true"
                  >
                    Параметры
                  </button>
                  <button
                    type="button"
                    class="list-group-item list-group-item-action"
                  >
                    Права
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- 
        Этот кол должен быть вынесен и разбит по отдельности.
     -->
          <div class="col-xl-8 col-lg-8 col-md-12 col-12 mt-2">
            <h4>Параметры</h4>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label"
                >Email</label
              >
              <div class="col-sm-10">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  id="staticEmail"
                  value="email@example.com"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="inputPassword" class="col-sm-2 col-form-label"
                >Password</label
              >
              <div class="col-sm-10">
                <input
                  type="password"
                  class="form-control"
                  id="inputPassword"
                />
              </div>
            </div>
            <h4>Права</h4>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                name="test"
              />
              <label class="form-check-label" for="flexSwitchCheckDefault"
                >Роль 1</label
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import AdminNavbar from "@/components/Admin/AdminNavbar.vue";

import { adminPages } from "@/utils/helpers";

const currentPage = "users";
</script>
