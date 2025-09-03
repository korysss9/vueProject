import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getUsers } from "../services/users.js";

export const useUsersStore = defineStore("users", () => {
  const users = ref([]);          
  const serverUsers = ref([]);    

  const fetchUsers = async () => {
    if (serverUsers.value.length) return;
    try {
      const response = await getUsers();
      serverUsers.value = response.data;
      users.value = [...serverUsers.value];
    } catch (err) {
      console.error("Ошибка загрузки пользователей:", err);
    }
  };

  const addUser = (user) => {
    user.id = Date.now(); 
    users.value.push(user);
  };

  const allUsers = computed(() => users.value);

  return { users, serverUsers, fetchUsers, addUser, allUsers };
});
