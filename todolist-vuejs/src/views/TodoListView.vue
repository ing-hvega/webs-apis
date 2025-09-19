<template>
  <div class="todo-list-view">
    <div>
      <h1>Listado de tareas</h1>
    </div>

    <div class="todo-container">
      <div class="todo-header">
        <input v-model="taskTitle" type="text" placeholder="Agrega tu tarea" class="todo-input" />

        <button class="todo-button" @click="addTodo">Agregar</button>

        <div v-if="tasks.length > 0" class="todo-list-for">
          <div v-for="task in tasks" :key="task.id" class="todo-item">
            <div class="todo-item-element">
              <div>
                <input type="checkbox" :checked="task.checked" @change="changeStatus(task.id)" />
              </div>
              <div>{{ task.title }}</div>
            </div>
            <div>
              <button @click="removeTodo(task.id)" class="todo-delete">x</button>
            </div>
          </div>
        </div>
        <div v-else class="todo-empty-state">
          <p>No hay tareas pendientes por mostrar</p>
        </div>

        <div class="todo-list-result">
          <div class="total">Total: {{ results.total }}</div>
          <div class="complete">Completados: {{ results.completed }}</div>
          <div class="pending">Pendientes: {{ results.pending }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

const tasks = ref([])
const taskTitle = ref('')
const results = ref({
  total: 0,
  completed: 0,
  pending: 0,
})

const addTodo = () => {
  tasks.value.push({ id: Date.now(), title: taskTitle.value, checked: false })
  taskTitle.value = ''

  updateStore()
}

const removeTodo = (id) => {
  tasks.value = tasks.value.filter((item) => item.id !== id)

  updateStore()
}

const changeStatus = (id) => {
  const item = tasks.value.find((item) => item.id === id)
  if (item) {
    item.checked = !item.checked

    tasks.value = [...tasks.value]

    updateStore()
  }
}

const updateStore = () => {
  localStorage.setItem('todoList', JSON.stringify(tasks.value))
}

onMounted(() => {
  const storedTasks = localStorage.getItem('todoList')
  if (storedTasks) {
    tasks.value = JSON.parse(storedTasks)
  }
})

watch(
  () => tasks,
  () => {
    results.value.completed = tasks.value.filter((item) => item.checked).length
    results.value.pending = tasks.value.filter((item) => !item.checked).length
    results.value.total = tasks.value.length
  },
  { deep: true },
)
</script>

<style scoped>
@import '@/assets/todo-list.css';
</style>
