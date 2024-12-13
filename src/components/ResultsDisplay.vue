<template>
  <div class="results-container">
    <h3>Результаты:</h3>
    <pre v-if="results">{{ results }}</pre>
    <div v-else class="placeholder">
      Здесь будут отображаться результаты выполнения кода.
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  results: String
});

const emits = defineEmits(["update:results"]);

const results = props.results;

watch(results, (newValue) => {
  emits("update:results", newValue);
});
</script>

<style scoped>
.results-container {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  min-height: 100px;
}

pre {
  white-space: pre-wrap;
}

.placeholder {
  color: #888;
}
</style>
