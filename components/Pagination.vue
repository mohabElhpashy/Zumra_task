<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">
      Next
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const { currentPage, totalPages } = defineProps(["currentPage", "totalPages"]);

const emit = defineEmits();

console.log("loggss", currentPage, totalPages);
const prevPage = () => {
  if (currentPage > 1) {
    emit("page-change", currentPage - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    emit("page-change", currentPage + 1);
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>
