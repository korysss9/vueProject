<script setup>
import { ref, computed, onMounted } from "vue";
import { useUsersStore } from "../stores/users";
import UserTable from "../components/UserTable.vue";

const store = useUsersStore();
const searchTerm = ref("");

onMounted(() => {
  store.fetchUsers();
});

const filteredUsers = computed(() => {
  const term = searchTerm.value.toLowerCase().replace(/\s+/g, "");

  
  return store.users.filter((user) =>
    user.name.toLowerCase().replace(/\s+/g, "").includes(term)
  );
});

const handleSearch = (value) => {
  searchTerm.value = value;
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <UserTable
      :users="filteredUsers"
      :searchTerm="searchTerm"
      @update:searchTerm="handleSearch"
    />
  </div>
</template>
