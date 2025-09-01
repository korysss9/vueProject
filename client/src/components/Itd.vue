<script setup>
import { computed, ref } from "vue";
import { toast } from "vue-sonner";

const txtValue = ref("");
const txtList = ref([]);
const editingIndex = ref(null);

const selectList = ref([
  { label: "Все", value: 1 },
  { label: "Активные", value: 2 },
  { label: "Выполненные", value: 3 },
]);

const selectedValue = ref(1);

const onAddTxt = (event) => {
  if (event) event.preventDefault();
  if (!txtValue.value.trim()) {
    toast.warning("Заполните поле ввода");
    return;
  }

  if (editingIndex.value !== null) {
    const oldTxt = txtList.value[editingIndex.value].nname;
    txtList.value[editingIndex.value].nname = txtValue.value;
    editingIndex.value = null;
    toast.success(`${oldTxt} успешно изменен на ${txtValue.value}`);
  } else {
    if (!txtList.value.some((item) => item.nname === txtValue.value)) {
      txtList.value.push({ nname: txtValue.value, done: false });
      toast.success(`${txtValue.value} успешно добавлен`);
    } else {
      toast.warning("Такая запись уже существует");
    }
  }
  txtValue.value = "";
};

const onRemove = (item) => {
  const index = txtList.value.indexOf(item);
  if (index > -1) {
    txtList.value.splice(index, 1);
    toast.success(`${item.nname} успешно удален`);
  }
};

const onRedactor = (item) => {
  txtValue.value = item.nname;
  editingIndex.value = txtList.value.indexOf(item);
};

const onDoneCheck = (item) => {
  item.done = !item.done;
  toast.warning(`${item.done ? "Выполнено" : "Активно"} `);
};

const filteredList = computed(() => {
  if (selectedValue.value == 1) return txtList.value;
  if (selectedValue.value == 2)
    return txtList.value.filter((item) => !item.done);
  if (selectedValue.value == 3)
    return txtList.value.filter((item) => item.done);
  return txtList.value;
});
</script>

<template>
  <div class="min-w-[32rem] max-w-xl">
    <form @submit.prevent="onAddTxt">
      <div>
        <label
          for="first_name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Поле ввода
        </label>
        <div class="flex gap-2 items-center">
          <input
            v-model="txtValue"
            type="text"
            id="first_name"
            placeholder="Введите текст..."
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            {{ editingIndex !== null ? "Изменить" : "Добавить" }}
          </button>
        </div>
      </div>
    </form>

    <div class="flex gap-4 items-center justify-between my-4">
      <h2 class="mb-2 mt-2 text-lg font-semibold text-gray-900 dark:text-white">
        Список:
      </h2>
      <form>
        <select
          v-model="selectedValue"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option
            v-for="item in selectList"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </form>
    </div>

    <ul class="space-y-1 text-gray-500 list-inside dark:text-gray-400">
      <li
        v-for="item in filteredList"
        :key="item.nname"
        class="flex items-center justify-between border-b gap-4"
      >
        <div class="flex items-center hover:border-b" @click="onRedactor(item)">
          <svg
            class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
            />
          </svg>
          <p :class="{ 'line-through text-gray-400': item.done }">
            {{ item.nname }}
          </p>
        </div>

        <div class="flex items-center gap-4">
          <input
            type="checkbox"
            :checked="item.done"
            @change="onDoneCheck(item)"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            @click="onRemove(item)"
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Удалить
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
