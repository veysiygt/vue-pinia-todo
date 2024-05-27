<template>
  <div id="app" class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <TodoApp />
  </div>
</template>

<script>
import TodoApp from './components/TodoApp.vue'

export default {
  components: {
    TodoApp
  }
}
</script>