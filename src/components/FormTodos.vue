<template>
  <div>
    <h3>Задачи:</h3>

    <div class="todo-input">
      <input
        type="text"
        v-model="createdTodo"
        placeholder="Новая задача"
        @keydown.enter.prevent="saveTodo"
      />
    </div>

    <div class="overflow-content">
      <div
        class="todo-card body"
        v-for="todo in form.todos"
        :key="todo.id"
        @click="todo.complited = !todo.complited"
        style="max-height: 400px"
      >
        <div style="display: flex; width: 100%">
          <div style="align-self: center">
            <input type="checkbox" v-model="todo.complited" />
          </div>
          <div @change="compliteTodo(todo)">
            <!-- eslint-disable-next-line prettier/prettier -->
            <span class="todo-title" :class="todo.complited ? 'todo-complited' : ''">
              {{ todo.title }}
            </span>
          </div>
        </div>
        <div class="info-button pointer">
          <span class="mdi mdi-pencil"></span>
        </div>
        <!-- eslint-disable-next-line prettier/prettier -->
        <div class="delete-button pointer" @click="deleteNoteTodo(todo)">
          <span class="mdi mdi-delete"></span>
        </div>
      </div>
    </div>

    <!-- information about the number of completed todos and all todos  -->
    <div style="color: gray">
      Выполнено:
      {{ form.todos?.filter((todo) => todo.complited).length ?? 0 }} /
      {{ form.todos?.length ?? 0 }}
    </div>
  </div>
</template>
<script setup>
import { computed, ref, defineProps, defineEmits } from "vue";
const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  notes: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["addTodo", "deleteTodo"]);

const createdTodo = ref("");

// Individual id for todo
const idForCreatedTodo = computed(() => {
  return props.form.todos?.length // check note on exist todos
    ? Math.max(...props.form.todos.map((todo) => todo.id)) + 1 // if
    : props.notes.length
    ? 1 +
      Math.max(
        ...props.notes
          // eslint-disable-next-line prettier/prettier
          .map((note) => (note?.todos.length ? note.todos.map((todo) => todo.id) : 0))
          .flat(1)
      )
    : 1;
});

const saveTodo = () => {
  //check input todo title
  if (createdTodo.value.length) {
    let date = new Date(); // for created todo date
    // preapare todo object
    let todo = {
      id: idForCreatedTodo.value,
      title: createdTodo.value.length
        ? createdTodo.value.charAt(0).toUpperCase() + createdTodo.value.slice(1)
        : "",
      complited: false,
      created: date.toLocaleDateString(),
    };
    emit("addTodo", todo);
    createdTodo.value = ""; // reset todo input
  }
};

const compliteTodo = (todo) => {
  console.log(todo);
};

const deleteNoteTodo = (todo) => {
  console.log(todo);
  emit("deleteTodo", todo);
};
</script>

<style scoped>
.todo-input {
  margin-bottom: 15px;
}
.todo-input input {
  height: 70%;
  padding: 6px 10px 6px 10px;
  position: relative;
  margin-bottom: 10px;
  outline: none;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid #999;
}
.todo-input input::placeholder {
  color: #bfbfbf;
}

.todo-card {
  text-align: center;
  display: flex;
  cursor: pointer;
  font-size: 16px;
  background: #fff;
  padding: 5px 10px 5px 10px;
  justify-content: space-between;
}

.todo-card:hover {
  background: #f0fff4;
}
.todo-title {
  float: left;
  text-align: left;
  padding: 0 10px 0 10px;
}

.todo-complited {
  color: rgb(103, 103, 103);
  text-decoration: line-through;
  text-align: left;
}

.button:hover {
  background-color: #2f7197;
}

li {
  justify-content: space-between;
  padding: 1px 5px 1px 5px;
  display: flex;
}

li:not(:last-child) {
  border-bottom: 1px solid lightblue;
}

li:first-child {
  margin-top: 1rem;
}

li:last-child {
  margin-bottom: 1rem;
}
li:hover {
  background-color: #f0f0f0;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  -ms-transition: all 0.2s;
  -o-transition: all 0.2s;
}
</style>
