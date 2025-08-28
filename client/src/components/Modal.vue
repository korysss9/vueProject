<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Модалка",
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "confirm"]);

const closeModal = () => emit("close");
const onConfirm = () => emit("confirm");
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white dark:bg-gray-700 rounded-lg max-w-2xl w-full p-5">
      <!-- хедер -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ title }}
        </h3>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>

      <!-- тело модалки -->
      <div>
        <slot></slot>
      </div>

      <!-- футер -->
      <div class="flex justify-end space-x-2 mt-4">
        <button
          :disabled="props.isDisabled"
          @click="onConfirm"
          :class="[
            'font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4',
            props.isDisabled
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
              : 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700',
          ]"
        >
          Обновить
        </button>
        <button
          @click="closeModal"
          class="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Закрыть
        </button>
      </div>
    </div>
  </div>
</template>
