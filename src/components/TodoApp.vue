<template>
  <div class="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="p-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-6 text-center">Todo App</h1>
      <div class="flex mb-6">
        <input 
          v-model="newTodo" 
          @keyup.enter="addNewTodo" 
          placeholder="Add a new todo" 
          class="flex-grow px-4 py-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
          @click="addNewTodo" 
          class="px-6 py-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add
        </button>
      </div>
      <div class="flex justify-between mb-6">
        <button @click="setFilter('all')" :class="filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200' " class="px-4 py-2 rounded">All</button>
        <button @click="setFilter('active')" :class="filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200' " class="px-4 py-2 rounded">Active</button>
        <button @click="setFilter('completed')" :class="filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200' " class="px-4 py-2 rounded">Completed</button>
      </div>
      <div class="max-h-96 overflow-y-scroll scrollbar-visible">
        <ul class="space-y-4">
          <li 
            v-for="(todo, index) in filteredTodos" 
            :key="index" 
            class="flex items-center justify-between py-4 px-6 bg-gray-100 rounded-md shadow-sm"
          >
            <div class="flex-1 overflow-x-auto whitespace-nowrap pr-4">
              <span :class="{ 'line-through': todo.completed }">{{ todo.text }}</span>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="toggleTodo(index)" 
                class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700"
              >
                {{ todo.completed ? 'Undo' : 'Complete' }}
              </button>
              <button 
                @click="openEditModal(index)" 
                class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700"
              >
                Edit
              </button>
              <button 
                @click="removeTodo(index)" 
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Modal 
      :show="isModalVisible" 
      title="Edit Todo" 
      @close="isModalVisible = false" 
      @confirm="confirmEdit"
    >
      <input 
        v-model="modalTodoText" 
        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import Modal from './Modal.vue'

const newTodo = ref('')
const todoStore = useTodoStore()
const filter = ref('all')
const isModalVisible = ref(false)
const modalTodoIndex = ref(null)
const modalTodoText = ref('')

const addNewTodo = () => {
  if (newTodo.value.trim() !== '') {
    todoStore.addTodo(newTodo.value)
    newTodo.value = ''
  }
}

const removeTodo = (index) => {
  todoStore.removeTodo(index)
}

const toggleTodo = (index) => {
  todoStore.toggleTodo(index)
}

const openEditModal = (index) => {
  modalTodoIndex.value = index
  modalTodoText.value = todoStore.todos[index].text
  isModalVisible.value = true
}

const confirmEdit = () => {
  if (modalTodoText.value.trim() !== '') {
    todoStore.editTodo(modalTodoIndex.value, modalTodoText.value)
    isModalVisible.value = false
  }
}

const setFilter = (newFilter) => {
  filter.value = newFilter
}

const filteredTodos = computed(() => {
  return todoStore.filteredTodos(filter.value)
})
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}

.scrollbar-visible::-webkit-scrollbar {
  width: 12px;
}

.scrollbar-visible::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.scrollbar-visible::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>