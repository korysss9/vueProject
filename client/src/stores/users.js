import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsersStore = defineStore("users", () => {
  const users = ref([
    { id: 1, name: "Leanne Graham", email: "Sincere@april.biz", phone: "1-770-736-8031" },
    { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv", phone: "010-692-6593" }
  ]);

  const addUser = (user) => {
    user.id = users.value.length + 1;
    users.value.push(user);
  };

  return { users, addUser };
});
