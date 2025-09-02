<script setup>
import { ref, onMounted, computed } from "vue";
import { getProducts } from "../services/products.js";
import Modal from "../components/Modal.vue";
import ProductModalContent from "./ProductModalContent.vue";
import { toast } from "vue-sonner";
import { useRouter } from "vue-router";

const router = useRouter();
const users = ref([]);
const isOpen = ref(false);
const productValue = ref({
  pName: "",
  pPrice: "",
  pBrand: "",
  pColor: "",
});
const originalValue = ref({});
const searchTerm = ref("");

onMounted(async () => {
  try {
    const response = await getProducts();
    users.value = response.data;
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
  toast.success("Продукт успешно обновлён!");
  isOpen.value = false;
};

const isDisabled = computed(() => {
  return JSON.stringify(productValue.value) === JSON.stringify(originalValue.value);
});

const filteredProducts = computed(() => {
  const term = searchTerm.value.toLowerCase().replace(/\s+/g, "");
  return users.value.filter((product) =>
    product.name.toLowerCase().replace(/\s+/g, "").includes(term)
  );
});

const goToUserDetail = (id) => {
  router.push({ name: "UserDetail", params: { id } });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Заголовок + Поиск -->
    <div class="flex justify-between items-start mb-4 flex-wrap gap-4">
      <p class="text-2xl">Пользователи</p>
      <form class="w-full max-w-[400px]" @submit.prevent>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >Search</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            v-model="searchTerm"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Поиск по имени..."
          />
        </div>
      </form>
    </div>

    <!-- Таблица -->
    <div class="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white">
      <table class="w-full max-w-full min-w-[827px] text-sm text-left text-gray-700">
        <caption
          class="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-100 rounded-t-lg"
        >
          <p class="mt-1 text-sm font-normal text-gray-500">Список пользователей</p>
        </caption>
        <thead class="text-xs uppercase bg-gray-200 text-gray-700">
          <tr>
            <th class="px-6 py-3">№</th>
            <th class="px-6 py-3">Имя</th>
            <th class="px-6 py-3">email</th>
            <th class="px-6 py-3">Телефон</th>
            <th class="px-6 py-3">Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in filteredProducts"
            :key="index"
            class="border-b border-gray-200 hover:bg-gray-100 transition-all duration-200"
          >
            <td class="px-6 py-4">{{ index + 1 }}</td>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ product.name }}
            </th>
            <td class="px-6 py-4">{{ product.email }}</td>
            <td class="px-6 py-4">{{ product.phone }}</td>
            <td class="px-6 py-4 text-right">
              <a
                @click.prevent="goToUserDetail(product.id)"
                href="#"
                class="font-medium text-blue-600 hover:text-blue-500 hover:underline flex items-center gap-2"
              >
                <p>Подробнее</p>

                <svg
                  class="w-3 h-3 text-blue-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z"
                  />
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Модальное окно -->
    <!-- <Modal
      :isOpen="isOpen"
      title="Редактировать продукт"
      @close="closeModal"
      @confirm="confirmUpdate"
      :isDisabled="isDisabled"
    >
      <ProductModalContent :list="productValue" />
    </Modal> -->
  </div>
</template>
