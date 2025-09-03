<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="w-full min-w-[400px] p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">
      Список пользователей
    </h3>
    <ul
      class="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
    >
      <li
        v-for="user in users"
        :key="user.id"
        class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
      >
        <p class="text-gray-800 font-medium">{{ user.name }}</p>
        <p class="text-gray-600">{{ user.email }}</p>
        <p class="text-gray-600">{{ user.phone }}</p>
      </li>
    </ul>
  </div>
</template>
