<script setup>
import { ref } from "vue";
import Logo from "../../public/vite.svg";
import { BurgerIcon, CloseIcon } from "../assets/icons";
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <nav
    class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
  >
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <router-link
        to="/user-table"
        class="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <img :src="Logo" class="h-8" alt="Vue Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Vue.js</span
        >
      </router-link>

      <!-- кнопка мобильного меню -->
      <div class="flex md:hidden">
        <button
          @click="toggleMenu"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          :aria-expanded="isOpen.toString()"
        >
          <span class="sr-only">Open main menu</span>
          <span v-html="!isOpen ? BurgerIcon : CloseIcon"></span>
        </button>
      </div>

      <!-- для больших экранов -->
      <div class="hidden md:flex md:items-center md:space-x-8">
        <ul class="flex space-x-8">
          <li>
            <router-link
              to="/user-table"
              class="block py-2 px-3 text-gray-900 rounded-sm dark:text-white"
              active-class="text-blue-700 dark:text-blue-500"
              exact-active-class="text-blue-700 dark:text-blue-500"
            >
              Пользователи
            </router-link>
          </li>
          <li>
            <router-link
              to="/add-user"
              class="block py-2 px-3 text-gray-900 rounded-sm hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
              active-class="text-blue-700 dark:text-blue-500"
            >
              Добавить
            </router-link>
          </li>
          <li>
            <router-link
              to="/itd"
              class="block py-2 px-3 text-gray-900 rounded-sm hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
              active-class="text-blue-700 dark:text-blue-500"
            >
              Еще...
            </router-link>
          </li>
        </ul>
      </div>

      <!-- мобильное меню -->
      <div
        v-show="isOpen"
        class="mobile-menu absolute top-full left-0 w-full bg-gray-50 dark:bg-gray-800 md:hidden p-4 border border-gray-100 dark:border-gray-700 rounded-b-lg"
      >
        <ul class="flex flex-col space-y-2">
          <li>
            <router-link
              to="/user-table"
              class="block py-2 px-3 text-gray-900 rounded-sm dark:text-white"
              active-class="text-blue-700 dark:text-blue-500"
              exact-active-class="text-blue-700 dark:text-blue-500"
              @click="toggleMenu"
            >
              Пользователи
            </router-link>
          </li>
          <li>
            <router-link
              to="/add-user"
              class="block py-2 px-3 text-gray-900 rounded-sm dark:text-white"
              active-class="text-blue-700 dark:text-blue-500"
              exact-active-class="text-blue-700 dark:text-blue-500"
              @click="toggleMenu"
            >
              Добавить
            </router-link>
          </li>
          <li>
            <router-link
              to="/itd"
              class="block py-2 px-3 text-gray-900 rounded-sm hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
              active-class="text-blue-700 dark:text-blue-500"
              @click="toggleMenu"
            >
              Еще...
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
