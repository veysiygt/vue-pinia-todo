<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
      <slot></slot>
      <div class="mt-4 flex justify-end">
        <button
          @click="close"
          class="px-4 py-2 bg-gray-500 text-white rounded mr-2"
        >
          Cancel
        </button>
        <button
          @click="confirm"
          class="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  show: Boolean,
  title: String,
});

const emit = defineEmits(["close", "confirm"]);

const close = () => {
  emit("close");
};

const confirm = () => {
  emit("confirm");
};
</script>
