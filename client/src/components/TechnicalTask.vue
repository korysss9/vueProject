<script setup>
import { ref, onMounted, computed } from "vue";
import { getProducts } from "../services/products.js";
import Modal from "../components/Modal.vue";
import ProductModalContent from "./ProductModalContent.vue";

const products = ref([]);
const isOpen = ref(false);
const productValue = ref({
  pName: "",
  pPrice: "",
  pBrand: "",
  pColor: "",
});
const originalValue = ref({});

onMounted(async () => {
  try {
    const response = await getProducts();
    products.value = response.data;
  } catch (error) {
    console.error("Ошибка загрузки продуктов:", error);
  }
});

const openModal = (product) => {
  const { name, price, brand, color } = product;
  productValue.value = {
    pName: name,
    pPrice: price,
    pBrand: brand,
    pColor: color,
  };
  originalValue.value = { ...productValue.value };
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

const confirmUpdate = () => {
  console.log("Обновляем продукт:", productValue.value);
  isOpen.value = false;
};

const isDisabled = computed(() => {
  return (
    JSON.stringify(productValue.value) === JSON.stringify(originalValue.value)
  );
});
</script>

<template>
  <div>
    <p class="text-2xl mb-4">Таблица продуктов</p>
    <div class="relative overflow-x-auto shadow-lg sm:rounded-lg bg-gray-900">
      <table class="w-full text-sm text-left text-gray-300 dark:text-gray-200">
        <caption
          class="p-5 text-lg font-semibold text-left text-gray-200 bg-gray-800 rounded-t-lg"
        >
          q-store
          <p class="mt-1 text-sm font-normal text-gray-400">
            Список продуктов.
          </p>
        </caption>
        <thead class="text-xs uppercase bg-gray-700 text-gray-300">
          <tr>
            <th class="px-6 py-3">№</th>
            <th class="px-6 py-3">Название продукта</th>
            <th class="px-6 py-3">Цвет</th>
            <th class="px-6 py-3">Категория</th>
            <th class="px-6 py-3">Цена</th>
            <th class="px-6 py-3">Бренд</th>
            <th class="px-6 py-3">Акции</th>
            <th class="px-6 py-3">Рейтинг</th>
            <th class="px-6 py-3">Изменить</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in products"
            :key="index"
            class="border-b border-gray-700 hover:bg-gray-800"
          >
            <td class="px-6 py-4">{{ index + 1 }}</td>

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
                @click.prevent="openModal(product)"
                href="#"
                class="font-medium text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-2"
              >
                <svg
                  class="w-3 h-3 text-blue-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 10"
                >
                  <path
                    d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z"
                  />
                </svg>
                <p>Редактировать</p>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal
      :isOpen="isOpen"
      title="Редактировать продукт"
      @close="closeModal"
      @confirm="confirmUpdate"
      :isDisabled="isDisabled"
    >
      <ProductModalContent :list="productValue" />
    </Modal>
  </div>
</template>
