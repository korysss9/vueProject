<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getProducts } from "../services/products.js";
const route = useRoute();
const userId = Number(route.params.id);
const userObj = ref(null);

onMounted(async () => {
  try {
    const response = await getProducts();
    userObj.value = response.data.find((i) => i.id === userId);
  } catch (error) {
    console.error("Ошибка загрузки продуктов:", error);
  }
});
</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li>
        <div class="flex items-center">
          <svg
            class="w-3 h-3 me-2.5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
            />
          </svg>
          <router-link
            to="/user-table"
            class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
          >
            Пользователи
          </router-link>
        </div>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <svg
            class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span
            class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400"
            >{{ userObj?.name }}</span
          >
        </div>
      </li>
    </ol>
  </nav>

  <!-- Карточка пользователя -->
  <div
    v-if="userObj"
    class="w-full max-w-full min-w-[827px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-6"
  >
    <div class="flex flex-col md:flex-row">
      <div class="md:w-1/3 bg-gray-50 p-6 flex flex-col items-center">
        <img
          class="w-32 h-32 rounded-full mb-4"
          src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          alt="Аватар пользователя"
        />
        <h2 class="text-xl font-semibold text-gray-900">{{ userObj.name }}</h2>
        <p class="text-gray-600">@{{ userObj.username }}</p>
      </div>
      <div class="md:w-2/3 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Контактная информация</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p class="text-gray-500 text-sm">Email</p>
            <p class="text-gray-900">{{ userObj.email }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Телефон</p>
            <p class="text-gray-900">{{ userObj.phone }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Вебсайт</p>
            <p class="text-gray-900">{{ userObj.website }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Город</p>
            <p class="text-gray-900">{{ userObj.address.city }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Улица</p>
            <p class="text-gray-900">
              {{ userObj.address.street }}, {{ userObj.address.suite }}
            </p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Индекс</p>
            <p class="text-gray-900">{{ userObj.address.zipcode }}</p>
          </div>
        </div>

        <h3 class="text-lg font-semibold text-gray-900 mb-4">Компания</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p class="text-gray-500 text-sm">Название</p>
            <p class="text-gray-900">{{ userObj.company.name }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Девиз</p>
            <p class="text-gray-900">{{ userObj.company.catchPhrase }}</p>
          </div>
          <div class="sm:col-span-2">
            <p class="text-gray-500 text-sm">Сфера деятельности</p>
            <p class="text-gray-900">{{ userObj.company.bs }}</p>
          </div>
        </div>

        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Географические координаты
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p class="text-gray-500 text-sm">Широта</p>
            <p class="text-gray-900">{{ userObj.address.geo.lat }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Долгота</p>
            <p class="text-gray-900">{{ userObj.address.geo.lng }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
