<script setup>
import { ref, onMounted, watch } from "vue";
import * as monaco from "monaco-editor";

const editorEl = ref(null);
const editorInstance = ref(null);

const props = defineProps({
  modelValue: String,
  language: String
});

const emit = defineEmits(["update:modelValue"]);

onMounted(() => {
  editorInstance.value = monaco.editor.create(editorEl.value, {
    value: props.modelValue,
    language: props.language,
    theme: "vs-dark",
    automaticLayout: true
  });

  editorInstance.value.onDidChangeModelContent(() => {
    emit("update:modelValue", editorInstance.value.getValue());
  });
});

watch(
  () => props.language,
  (newLanguage) => {
    if (editorInstance.value) {
      monaco.editor.setModelLanguage(
        editorInstance.value.getModel(),
        newLanguage
      );
    }
  }
);

watch(
  () => props.modelValue,
  (newValue) => {
    if (editorInstance.value && editorInstance.value.getValue() !== newValue) {
      editorInstance.value.setValue(newValue);
    }
  }
);

onBeforeUnmount(() => {
  if (editorInstance.value) {
    editorInstance.value.dispose();
  }
});
</script>

<template>
  <div ref="editor" style="height: 300px" />
</template>
