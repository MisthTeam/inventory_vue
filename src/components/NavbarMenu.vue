<template>
  <nav
    v-if="userStore.isLoggenIn"
    class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm"
  >
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/"> Inventory </router-link>
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
            <router-link to="/" aria-current="page" class="nav-link">
              Главная
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/items" aria-current="page" class="nav-link">
              Комплектующие
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/"
              aria-current="page"
              class="nav-link disabled"
              aria-disabled="true"
            >
              Девайсы
            </router-link>
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
                {{ userStore.getUser.login }}
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a class="dropdown-item" href="#">Профиль</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Настройки</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Панель администратора</a>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/logout">
                    Выход
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Поиск"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Найти</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from "@/stores";

const userStore = useUserStore();
</script>
