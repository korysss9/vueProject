<script setup>
import { onMounted } from "vue";
import AddUserForm from "../components/AddUserForm.vue";
import AddUserFormList from "../components/AddUserFormList.vue";
import { useUsersStore } from "../stores/users";

const store = useUsersStore();
onMounted(() => {
  store.fetchUsers();
});

</script>

<template>
  <div class="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-10">
    <AddUserForm />
    <AddUserFormList :users="store.users" />
  </div>
</template>
