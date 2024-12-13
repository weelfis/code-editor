<template>
  <vue-monaco-editor
    v-model="value"
    :language="language"
    :options="options"
    style="height: 300px; min-height: 300px; font-size: 20px"
  />
</template>

<script>
import { defineComponent } from "vue";
import VueMonacoEditor from "@guolao/vue-monaco-editor"; // Important: Correct import

export default defineComponent({
  components: {
    VueMonacoEditor // Use the imported name here
  },
  props: {
    modelValue: String,
    language: String,
    options: {
      type: Object,
      default: () => ({
        theme: "vs-dark",
        automaticLayout: true
      })
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      value: this.modelValue
    };
  },
  watch: {
    modelValue(newValue) {
      this.value = newValue;
    },
    value(newValue) {
      this.$emit("update:modelValue", newValue);
    }
  }
});
</script>
