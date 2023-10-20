<template>
  <form class="flex h-[100vh]" @submit="handleSubmit">
    <div
      class="w-1/2 bg-foreground gap-5 flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-image"
    >
      <img
        class="w-96"
        src="https://www.zumrafood.com/images/zumrafood-en.png"
        alt="logo"
      />
      <p class="text-3xl text-foreground font-bold">
        Everytime is <span class="text-primary">sushi</span> time
      </p>
    </div>
    <div class="w-1/2 flex flex-col justify-center items-center gap-20">
      <h1 class="text-4xl font-bold">
        Login to <span class="text-primary">Zumra</span>
      </h1>
      <div class="form-inputs space-y-4 text-2xl">
        <div class="flex flex-col space-y-2">
          <Input
            :error="emailError"
            label="Email address"
            type="text"
            placeholder="example@mail.com"
            :value="email"
            @handle-input="handleEmail"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <Input
            :error="passwordError"
            label="Password"
            type="password"
            placeholder="password"
            :value="password"
            @handle-input="handlePassword"
          />
        </div>
      </div>
      <button
        :disabled="!!emailError || !!passwordError"
        type="submit"
        class="!bg-primary text-foreground w-[40rem] h-12 rounded-lg text-2xl disabled:opacity-50 duration-300"
      >
        Login
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Paths } from "~/constants/paths";
import { emailRegex, passwordRegex } from "~/constants/validationRegex";

const email = ref("");
const emailError = ref("");
const handleEmail = (input: string) => {
  email.value = input;
  validateEmail(input);
};

const password = ref("");
const passwordError = ref("");
const handlePassword = (input: string) => {
  password.value = input;
  validatePassword(input);
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

const login = async () => {
  const requestBody = {
    email: email.value,
    password: password.value,
  };

  try {
    const { data } = await useLogin(requestBody);

    localStorage.setItem("token", (data as any).value.token);
    navigateTo(Paths.HOME);
  } catch {
    toast("Login failed", {
      bodyClassName: "text-3xl",
      autoClose: 1000,
    });
  }
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  login();
};
</script>

<style scoped>
.bg-image {
  background-image: url("@/assets/bg.jpg");
}
</style>
