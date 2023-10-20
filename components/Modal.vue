<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
  >
    <div class="w-[w-[40rem]] flex flex-col">
      <div class="bg-white p-2 round relative">
        <button
          @click="closeModal"
          class="border-2 border-black w-6 h-6 rounded-full bg-black text-white flex justify-center items-center absolute right-6 top-10"
        >
          x
        </button>

        <div class="py-6 px-6 lg:px-8 text-left">
          <h1 class="text-3xl font-bold text-gray-900 mb-5">
            {{ currentAction }} <span class="text-primary">User</span>
          </h1>
          <form class="space-y-6" @submit="handleSubmit">
            <div>
              <label
                for="email"
                class="block mb-4 text-xl font-medium text-gray-900"
              >
                Name
              </label>
              <Input
                :error="nameError"
                type="text"
                placeholder="enter your name"
                :value="name"
                @handle-input="handleName"
              />
            </div>

            <div>
              <label
                for="email"
                class="block mb-4 text-xl font-medium text-gray-900"
              >
                Email
              </label>
              <Input
                :error="emailError"
                type="text"
                placeholder="example@mail.com"
                :value="email"
                @handle-input="handleEmail"
              />
            </div>

            <div>
              <label
                for="email"
                class="block mb-4 text-xl font-medium text-gray-900"
              >
                Password
              </label>
              <Input
                :error="passwordError"
                type="password"
                placeholder="password"
                :value="password"
                @handle-input="handlePassword"
              />
            </div>

            <div class="flex justify-start w-full p-4 items-center space-x-4">
              <label for="user"
                ><span class="text-xl font-semibold">User</span></label
              >
              <input
                type="radio"
                id="user"
                name="user"
                value="user"
                :checked="role === 'user'"
                v-model="role"
              />
              <label for="admin"
                ><span class="text-xl font-semibold">Admin</span></label
              >
              <input
                type="radio"
                id="admin"
                name="admin"
                value="admin"
                class="text-red-500 form-radio"
                :checked="role === 'admin'"
                v-model="role"
              />
            </div>
            <button
              :disabled="!!nameError || !!emailError || !!passwordError"
              type="submit"
              class="!w-[40rem] disabled:opacity-50 !duration-300 !text-white !bg-primary !hover:bg-red-800 !h-16 !focus:ring !focus:outline-none !focus:ring-red-300 !font-medium !rounded-lg !text-xl !px-5 !py-2.5 !text-center !hover:"
            >
              {{ currentAction }} User
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { emailRegex, passwordRegex } from "~/constants/validationRegex";

const { currentAction, selectedUser } = defineProps([
  "currentAction",
  "selectedUser",
]);

const emit = defineEmits();

const closeModal = () => {
  emit("close-modal");
};

const role = ref(currentAction === "Edit" ? selectedUser.role : "admin");

const email = ref(currentAction === "Edit" ? selectedUser.email : "");
const emailError = ref("");
const handleEmail = (input: string) => {
  email.value = input;
  validateEmail(input);
  validatePassword(password.value);
  validateName(name.value);
};

const password = ref("");
const passwordError = ref("");
const handlePassword = (input: string) => {
  password.value = input;
  validateEmail(email.value);
  validatePassword(input);
  validateName(name.value);
};

const name = ref(currentAction === "Edit" ? selectedUser.name : "");
const nameError = ref("");
const handleName = (input: string) => {
  name.value = input;
  validateEmail(email.value);
  validatePassword(password.value);
  validateName(input);
};

const validateEmail = (input: string) => {
  if (!input) {
    emailError.value = "Email is required";
    return;
  }

  if (!input.match(emailRegex)) {
    emailError.value = "Email is not valid";
    return;
  }

  emailError.value = "";
  return;
};

const validateName = (input: string) => {
  if (!input) {
    nameError.value = "Name is required";
    return;
  }

  nameError.value = "";
  return;
};

const validatePassword = (input: string) => {
  if (!input) {
    passwordError.value = "Password is required";
    return;
  }

  if (!input.match(passwordRegex)) {
    passwordError.value =
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character";
    return;
  }

  passwordError.value = "";
  return;
};

const createUser = async () => {
  const requestBody = {
    email: email.value,
    password: password.value,
    name: name.value,
    role: role.value,
  };

  try {
    await useAddUser(requestBody);
    const { data } = await useGetUsers();
    emit("update-users", data);
    closeModal();
  } catch {
    toast("Add user failed", {
      bodyClassName: "text-3xl",
      autoClose: 1000,
    });
  }
};

const editUser = async () => {
  const requestBody = {
    email: email.value,
    password: password.value,
    name: name.value,
    role: role.value,
  };

  try {
    await useEditUser(requestBody, selectedUser.id);
    const { data } = await useGetUsers();
    emit("update-users", data);
    closeModal();
  } catch {
    toast("Edit user failed", {
      bodyClassName: "text-3xl",
      autoClose: 1000,
    });
  }
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  if (!!nameError.value || !!emailError.value || !!passwordError.value) {
    return;
  }
  (await currentAction) === "Add" ? createUser() : editUser();
};
</script>
