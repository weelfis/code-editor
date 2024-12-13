<script setup>
import { ref } from "vue";
import MonacoEditor from "/src/components/MonacoEditor.vue";
import ResultsDisplay from "/src/components/ResultsDisplay.vue";

const code = ref("");
const language = ref("javascript"); // Значение по умолчанию
const results = ref("");

const runCode = async () => {
  console.log("Запускаем код:", code.value, "на языке:", language.value);
  results.value = "Выполняется...";

  try {
    const response = await fetch("/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: language.value,
        code: code.value
      })
    });
    const data = await response.json();
    if (data.status === "success") {
      results.value = data.output;
    } else {
      results.value = `Ошибка: ${data.error}`;
    }
  } catch (error) {
    results.value = `Ошибка: Не удалось подключиться к серверу.`;
  }
};
</script>

<template>
  <div>
    <h2>Online Code Editor</h2>
    <div>
      <label for="language-select">Язык:</label>
      <select id="language-select" v-model="language">
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>
    </div>
    <MonacoEditor v-model="code" :language="language" />
    <button @click="runCode">Запустить</button>
    <h2>Результаты</h2>
    <ResultsDisplay :results="results" />
  </div>
</template>
