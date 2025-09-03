<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="w-full max-w-full min-w-[827px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-6"
  >
    <div class="flex flex-col md:flex-row">
      <div class="md:w-1/3 bg-gray-50 p-6 flex flex-col items-center">
        <img
          class="w-32 h-32 rounded-full mb-4"
          src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          alt="Аватар пользователя"
        />
        <h2 class="text-xl font-semibold text-gray-900">{{ user.name }}</h2>
        <p class="text-gray-600">@{{ user.username ?? "—" }}</p>
      </div>
      <div class="md:w-2/3 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Контактная информация
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p class="text-gray-500 text-sm">Email</p>
            <p class="text-gray-900">{{ user.email }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Телефон</p>
            <p class="text-gray-900">{{ user.phone }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Вебсайт</p>
            <p class="text-gray-900">{{ user.website ?? "—" }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Город</p>
            <p class="text-gray-900">{{ user.address?.city ?? "—" }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Улица</p>
            <p class="text-gray-900">
              {{ user.address?.street ?? "—" }}, {{ user.address?.suite ?? "—" }}
            </p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Индекс</p>
            <p class="text-gray-900">{{ user.address?.zipcode ?? "—" }}</p>
          </div>
        </div>

        <h3 class="text-lg font-semibold text-gray-900 mb-4">Компания</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p class="text-gray-500 text-sm">Название</p>
            <p class="text-gray-900">{{ user.company?.name ?? "—" }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Девиз</p>
            <p class="text-gray-900">{{ user.company?.catchPhrase ?? "—" }}</p>
          </div>
          <div class="sm:col-span-2">
            <p class="text-gray-500 text-sm">Сфера деятельности</p>
            <p class="text-gray-900">{{ user.company?.bs ?? "—" }}</p>
          </div>
        </div>

        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Географические координаты
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p class="text-gray-500 text-sm">Широта</p>
            <p class="text-gray-900">{{ user.address?.geo?.lat ?? "—" }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Долгота</p>
            <p class="text-gray-900">{{ user.address?.geo?.lng ?? "—" }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
