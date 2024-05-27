import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useTodoStore = defineStore("todoStore", () => {
  const todos = ref(JSON.parse(localStorage.getItem("todos")) || []);

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos.value));
  };

  const addTodo = (text) => {
    todos.value.push({ text, completed: false });
    saveToLocalStorage();
  };

  const removeTodo = (index) => {
    todos.value.splice(index, 1);
    saveToLocalStorage();
  };

  const toggleTodo = (index) => {
    todos.value[index].completed = !todos.value[index].completed;
    saveToLocalStorage();
  };

  const editTodo = (index, newText) => {
    todos.value[index].text = newText;
    saveToLocalStorage();
  };

  const filteredTodos = (filter) => {
    if (filter === "completed") {
      return todos.value.filter((todo) => todo.completed);
    } else if (filter === "active") {
      return todos.value.filter((todo) => !todo.completed);
    } else {
      return todos.value;
    }
  };

  watch(todos, saveToLocalStorage, { deep: true });

  return { todos, addTodo, removeTodo, toggleTodo, editTodo, filteredTodos };
});
