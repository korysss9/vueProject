<script setup>
import { ref, onMounted } from "vue";
import { getProducts } from "../services/products.js"; // путь подкорректируйте под себя

const products = ref([]);

onMounted(async () => {
  try {
    const response = await getProducts();
    products.value = response.data;
  } catch (error) {
    console.error("Ошибка загрузки продуктов:", error);
  }
});
</script>

<template>
  <div>
    <p class="text-2xl ... mb-4">Таблица продуктов</p>
    <div class="relative overflow-x-auto shadow-lg sm:rounded-lg bg-gray-900">
      <table class="w-full text-sm text-left text-gray-300 dark:text-gray-200">
        <caption
          class="p-5 text-lg font-semibold text-left text-gray-200 bg-gray-800 rounded-t-lg"
        >
          ty-store
          <p class="mt-1 text-sm font-normal text-gray-400">
            Список продуктов.
          </p>
        </caption>
        <thead class="text-xs uppercase bg-gray-700 text-gray-300">
          <tr>
            <th class="px-6 py-3">Название продукта</th>
            <th class="px-6 py-3">Цвет</th>
            <th class="px-6 py-3">Категория</th>
            <th class="px-6 py-3">Цена</th>
            <th class="px-6 py-3">Бренд</th>
            <th class="px-6 py-3">Акции</th>
            <th class="px-6 py-3">Рейтинг</th>
            <th class="px-6 py-3">
              <span class="sr-only">Редактировать</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in products"
            :key="index"
            class="border-b border-gray-700 hover:bg-gray-800"
          >
            <th class="px-6 py-4 font-medium text-gray-100 whitespace-nowrap">
              {{ product.name }}
            </th>
            <td class="px-6 py-4">{{ product.color }}</td>
            <td class="px-6 py-4">{{ product.category }}</td>
            <td class="px-6 py-4">{{ product.price }}</td>
            <td class="px-6 py-4">{{ product.brand }}</td>
            <td class="px-6 py-4">{{ product.stock }}</td>
            <td class="px-6 py-4">{{ product.rating }}</td>
            <td class="px-6 py-4 text-right">
              <a
                href="#"
                class="font-medium text-blue-400 hover:text-blue-300 hover:underline"
              >
                Редактировать
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
