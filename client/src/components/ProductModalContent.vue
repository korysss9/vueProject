<script setup>
const props = defineProps({
  list: {
    type: Object,
    default: () => ({}),
  },
});

const fields = [
  { key: "pName", label: "Название", placeholder: "Название" },
  { key: "pPrice", label: "Цена", placeholder: "Цена" },
  { key: "pBrand", label: "Бренд", placeholder: "Бренд" },
  { key: "pColor", label: "Цвет", placeholder: "Цвет" },
];
</script>

<template>
  <div class="grid gap-4 mb-6 md:grid-cols-1">
    <div v-for="field in fields" :key="field.key">
      <label
        :for="field.key"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {{ field.label }}
      </label>
      <input
        v-model="list[field.key]"
        :id="field.key"
        type="text"
        :placeholder="field.placeholder"
        required
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  </div>
</template>
