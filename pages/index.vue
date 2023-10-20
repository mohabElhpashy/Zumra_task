<template>
  <div
    class="bg-foreground px-8 flex justify-between items-center sticky top-0"
  >
    <img class="w-20" src="@/assets/logo.png" alt="logo" />
    <p class="cursor-pointer text-primary font-bold" @click="logout">Logout</p>
  </div>
  <div
    class="px-8 mt-8 text-4xl font-semibold flex justify-between items-center"
  >
    <h1>Admin <span class="text-primary">Dashboard</span></h1>
    <div>
      <p class="text-primary">{{ day }}</p>
      <p>{{ monthYearString }}</p>
    </div>
  </div>
  <div class="w-[100%] relative flex items-start justify-end">
    
    <table>
       <button
            class="h-10 w-[50px] bg-primary  font-bold text-white  rounded-md   absolute right-3 top-8"
            @click="handleAdd(user)"
          >
        
            Add
          </button>
    <thead>
      <tr>
        <th class="w-1/4">Name</th>
        <th class="w-1/4">Email</th>
        <th class="w-1/4">Role</th>
        <th class="w-1/4">Actions</th>
       
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="(user as any).id">
        <td>
          {{ (user as any).name }}
        </td>
        <td>{{ (user as any).email }}</td>
        <td>
          {{
            (user as any).role.charAt(0).toUpperCase() +
            (user as any).role.slice(1)
          }}
        </td>
        <td>
          
          <button
            class="mx-4 h-10 w-20 bg-background rounded-md text-primary font-bold"
            @click="handleEdit(user)"
          >
            Edit
          </button>
          <button
            class="h-10 w-20 bg-background rounded-md text-primary font-bold"
            @click="handleDelete(user)"
          >
            Delete
          </button>
          <div></div>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
  
  <Pagination
    v-model="currentPage"
    :total-items="30"
    
    class="custom-pagination"
  />
  <Modal
    v-if="showModal"
    :currentAction="currentAction"
    :selectedUser="selectedUser"
    @update-users="updateUsers"
    @close-modal="closeModal"
  />
</template>

<script setup lang="ts">
import { day, monthYearString } from "../constants/dates";
import { Pagination } from "flowbite-vue";
import "flowbite/dist/flowbite.css";
import { toast } from "vue3-toastify";
import { Paths } from "~/constants/paths";

const currentAction = ref("Add");
const showModal = ref(false);
const selectedUser = ref();

const currentPage = ref(1);
const pageNumber = ref(1);
const totalPages = ref();
const users = ref([]);

const fetchUsers = async (page: number) => {
  const { data } = await useGetUsers(page);

  users.value = (data as any).value.users;
  pageNumber.value = (data as any).value.pageNumber;
  totalPages.value = (data as any).value.totalPages;
  return totalPages.value
};

onMounted(() => {
  fetchUsers(currentPage.value);
});

watch(currentPage, (newPage) => {
  fetchUsers(newPage);
});

const handleAdd = (user: any) => {
  currentAction.value = "Add";
  showModal.value = true;
  selectedUser.value = user;
};

const handleEdit = (user: any) => {
  currentAction.value = "Edit";
  showModal.value = true;
  selectedUser.value = user;
};

const handleDelete = async (user: any) => {
  try {
    await useDeleteUser(user.id);
    const { data } = await useGetUsers();
    users.value = (data as any).value.users;
    closeModal();
  } catch {
    console.log()
    toast("Add user failed", {
      bodyClassName: "text-3xl",
      autoClose: 1000,
    });
  }
};

const closeModal = () => {
  showModal.value = false;
};

const updateUsers = (updatedUsers: any) => {
  users.value = updatedUsers.value.users;
};

const logout = () => {
  localStorage.removeItem("token");
  navigateTo(Paths.LOGIN);
};
</script>

<style scoped>
table {
  text-align: left;
  width: 80%;
  margin: 0 auto 4rem auto;
  position: relative;
}

thead {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--primary);
}

tbody tr:not(:last-child) {
  background-color: var(--foreground);
  border-bottom: 2rem solid var(--background);
}

tbody tr {
  background-color: var(--foreground);
}

tbody tr td,
thead tr th {
  padding: 2rem 4rem;
}

tbody tr td:first-of-type {
  border-radius: 2rem 0 0 2rem;
}

tbody tr td:last-of-type {
  border-radius: 0 2rem 2rem 0;
}
.custom-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.custom-pagination .page-link {
  background-color: red;
  color: white;
  border: 1px solid red;
  margin: 2px;
}

.custom-pagination .page-link.active {
  background-color: white;
  color: red;
}
</style>
