<template>
  <label>{{ label }}</label>
  <input
    :class="[
      '!rounded-2xl !bg-foreground !border !p-4 !w-[40rem]',
      error ? '!border-error !focus:outline-error' : null,
    ]"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="updateValue"
  />
  <div v-if="error" class="!text-error !w-[40rem] !mt-2">
    &#x26A0; {{ error }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  error: String,
  label: String,
  placeholder: String,
  type: String,
  value: String,
});

const emit = defineEmits();

const inputValue = ref(props.value);

const updateValue = (event: Event) => {
  inputValue.value = (event.target as HTMLInputElement).value;
  emit("handle-input", inputValue.value);
};
</script>
