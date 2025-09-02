<script setup>
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email as isEmail } from "@vuelidate/validators";
import { useUsersStore } from "../stores/users";

const store = useUsersStore();

const name = ref("");
const userEmail = ref("");
const phone = ref("+996");

const isTouched = ref({
  name: false,
  userEmail: false,
  phone: false,
});

// Custom validators
const nameValid = (value) => /^[a-zA-Zа-яА-Я0-9\s_-]{1,20}$/.test(value);
const uniqueEmail = (value) => {
  if (!Array.isArray(store.users)) return true;
  return !store.users.some((u) => u.email.toLowerCase() === value.toLowerCase());
};
const phoneValid = (value) => /^\+996[0-9]{9}$/.test(value);

const formatPhone = (value) => {
  if (!value || value.length < 4) {
    return "+996";
  }

  let cleaned = value.replace(/[^0-9+]/g, "");

  if (!cleaned.startsWith("+996")) {
    cleaned = "+996" + cleaned.replace(/^\+.*$/, "");
  } else {
    cleaned = "+996" + cleaned.slice(4).replace(/\+/g, "");
  }

  return cleaned.slice(0, 13);
};

const rules = {
  name: { required, nameValid },
  userEmail: { required, isEmail, uniqueEmail },
  phone: { required, phoneValid },
};

const state = { name, userEmail, phone };
const v$ = useVuelidate(rules, state);

const submitForm = async () => {
  if (!v$.value) return;
  v$.value.$touch();
  await v$.value.$validate();
  if (v$.value.$invalid) {
    v$.value.$errors.forEach((error) => {
      isTouched.value[error.$property] = true;
    });

    const firstErrorField = v$.value.$errors[0]?.path;
    if (firstErrorField) {
      const fieldMap = {
        name: "Имя",
        userEmail: "Email",
        phone: "+996555555555",
      };
      document
        .querySelector(`input[placeholder="${fieldMap[firstErrorField]}"]`)
        ?.scrollIntoView({ behavior: "smooth" });
    }
    return;
  }

  store.addUser({
    name: name.value.trim(),
    email: userEmail.value.toLowerCase(),
    phone: phone.value,
  });

  name.value = "";
  userEmail.value = "";
  phone.value = "+996";
  isTouched.value = { name: false, userEmail: false, phone: false };
  v$.value.$reset();
};

const validateOnInput = (field) => {
  if (v$.value[field]) {
    v$.value[field].$touch();
    isTouched.value[field] = true;
  }
};

const markTouched = (field) => {
  isTouched.value[field] = true;
};
</script>

<template>
  <div class="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-10">
    <!-- Форма -->
    <div
      class="w-full min-w-[400px] p-6 bg-white rounded-xl shadow-md border border-gray-100 h-full"
    >
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Добавить пользователя</h2>

      <!-- Имя -->
      <div class="mb-5 relative">
        <div
          class="flex items-center border rounded-lg transition-all duration-300"
          :class="{
            'border-red-500': isTouched.name && v$.name.$error,
            'border-gray-300': !(isTouched.name && v$.name.$error),
            'ring-2 ring-blue-500': isTouched.name && !v$.name.$error && name,
          }"
        >
          <span class="pl-3 text-gray-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <input
            v-model="name"
            placeholder="Имя"
            @click="markTouched('name')"
            @blur="validateOnInput('name')"
            maxlength="20"
            class="w-full p-3 pl-2 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
        <p
          v-if="isTouched.name && v$.name.$error"
          class="text-red-500 text-sm mt-1.5 opacity-0 transition-opacity duration-300"
          :class="{ 'opacity-100': isTouched.name && v$.name.$error }"
        >
          <span v-if="v$.name.$errors.some((e) => e.$validator === 'required')"
            >Имя обязательно</span
          >
          <span v-else-if="v$.name.$errors.some((e) => e.$validator === 'nameValid')"
            >Неверный формат имени</span
          >
        </p>
      </div>

      <!-- Email -->
      <div class="mb-5 relative">
        <div
          class="flex items-center border rounded-lg transition-all duration-300"
          :class="{
            'border-red-500': isTouched.userEmail && v$.userEmail.$error,
            'border-gray-300': !(isTouched.userEmail && v$.userEmail.$error),
            'ring-2 ring-blue-500':
              isTouched.userEmail && !v$.userEmail.$error && userEmail,
          }"
        >
          <span class="pl-3 text-gray-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l9 6 9-6m0 13H3V8h18v13z"
              />
            </svg>
          </span>
          <input
            v-model="userEmail"
            placeholder="Email"
            @click="markTouched('userEmail')"
            @blur="validateOnInput('userEmail')"
            class="w-full p-3 pl-2 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
        <p
          v-if="isTouched.userEmail && v$.userEmail.$error"
          class="text-red-500 text-sm mt-1.5 opacity-0 transition-opacity duration-300"
          :class="{ 'opacity-100': isTouched.userEmail && v$.userEmail.$error }"
        >
          <span v-if="v$.userEmail.$errors.some((e) => e.$validator === 'uniqueEmail')"
            >Email уже занят</span
          >
          <span v-else-if="v$.userEmail.$errors.some((e) => e.$validator === 'isEmail')"
            >Неверный формат email</span
          >
          <span v-else-if="v$.userEmail.$errors.some((e) => e.$validator === 'required')"
            >Email обязателен</span
          >
        </p>
      </div>

      <!-- Номер -->
      <div class="mb-5 relative">
        <div
          class="flex items-center border rounded-lg transition-all duration-300"
          :class="{
            'border-red-500': isTouched.phone && v$.phone.$error,
            'border-gray-300': !(isTouched.phone && v$.phone.$error),
            'ring-2 ring-blue-500':
              isTouched.phone && !v$.phone.$error && phone !== '+996',
          }"
        >
          <span class="pl-3 text-gray-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </span>
          <input
            v-model="phone"
            @input="phone = formatPhone(phone)"
            @click="markTouched('phone')"
            @blur="validateOnInput('phone')"
            placeholder="+996555555555"
            maxlength="13"
            class="w-full p-3 pl-2 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
        <p
          v-if="isTouched.phone && v$.phone.$error"
          class="text-red-500 text-sm mt-1.5 opacity-0 transition-opacity duration-300"
          :class="{ 'opacity-100': isTouched.phone && v$.phone.$error }"
        >
          <span v-if="v$.phone.$errors.some((e) => e.$validator === 'required')"
            >Телефон обязателен</span
          >
          <span v-else-if="v$.phone.$errors.some((e) => e.$validator === 'phoneValid')"
            >Неверный формат телефона пример (+996555555555)</span
          >
        </p>
      </div>

      <button
        @click="submitForm"
        class="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform"
      >
        Добавить
      </button>
    </div>

    <!-- Список пользователей -->
    <div class="w-full min-w-[400px]">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Список пользователей</h3>
      <ul
        class="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        <li
          v-for="user in store.users || []"
          :key="user.id"
          class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
        >
          <p class="text-gray-800 font-medium">{{ user.name }}</p>
          <p class="text-gray-600">{{ user.email }}</p>
          <p class="text-gray-600">{{ user.phone }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
