<template>
  <div>
    <!-- input for create todo -->
    <div class="todo-form">
      <input
        placeholder="Новая задача.."
        v-model.trim="createdTodo"
        @keydown.enter.prevent="saveTodoAction"
        type="text"
        class="input-text"
      />

      <button class="button-todo" @click.prevent="saveTodoAction">
        Добавить
      </button>
    </div>

    <div class="overflow-content">
      <!-- todos card -->
      <div class="todo-card body" v-for="todo in form.todos" :key="todo.id">
        <div style="display: flex; width: 100%">
          <!-- todo checkbox -->
          <div style="align-self: center">
            <input type="checkbox" v-model="todo.complited" />
          </div>

          <!-- title todo -->
          <div
            style="width: 100%"
            v-if="editedTodo.id !== todo.id"
            @click="todo.complited = !todo.complited"
          >
            <span
              class="todo-title"
              :class="todo.complited ? 'todo-complited' : ''"
            >
              {{ todo.title }}
            </span>
          </div>

          <!-- input for edit todo -->
          <div v-else style="width: 100%">
            <input
              type="text"
              class="note-input"
              style="width: 95%"
              v-model="todo.title"
              placeholder="Изменение задачи"
              @keydown.enter.prevent="saveEditTodoAction(todo)"
            />
          </div>
        </div>

        <!-- buttons edit and if edit todo - save -->
        <div class="info-button pointer">
          <mdicon
            name="pencil"
            size="20"
            v-if="editedTodo.id !== todo.id"
            @click="editTodo(todo)"
          />
          <mdicon
            name="content-save-check-outline"
            size="20"
            v-else
            @click="saveEditTodoAction(todo)"
          />
        </div>

        <!-- buttons delete and if edit todo - cancel -->
        <div class="delete-button pointer">
          <mdicon
            name="cancel"
            size="20"
            class="mdi mdi-cancel"
            v-if="editedTodo.id === todo.id"
            @click="cancelEditTodo(todo.id)"
          />
          <mdicon
            v-else
            name="delete-sweep-outline"
            size="20"
            @click="deleteNoteTodo(todo.id)"
          />
        </div>
      </div>
    </div>

    <!-- information about the number of completed todos and all todos  -->
    <div style="color: gray; margin: 10px 0px 10px 0px">
      Выполнено:
      {{ form.todos?.filter((todo) => todo.complited).length ?? 0 }} /
      {{ form.todos?.length ?? 0 }}
    </div>
  </div>
</template>

<script setup>
import { form } from "../composables/NoteComposable";
import modalActionComposition from "../composables/ModalActionComposable";

// vars and methods from composable for work with todo
import {
  saveEditTodo,
  saveTodo,
  idForCreatedTodo,
  createdTodo,
  editedTodo,
  defaultEditedTodo,
} from "../composables/TodoComposable";
import { onUnmounted } from "vue";

const editTodo = (todo) => {
  // before edit save original state changeble todo
  if (todo)
    defaultEditedTodo.value = editedTodo.value = Object.assign(
      {},
      JSON.parse(JSON.stringify(todo))
    );
};

// reset edit todo
const cancelEditTodo = (todoId) => {
  form.value.todos = form.value.todos.map(
    (todo) => (todo = todo.id === todoId ? defaultEditedTodo.value : todo)
  );
  defaultEditedTodo.value = editedTodo.value = {};
};

// confirm edit todo
const saveEditTodoAction = (todo) => {
  if (todo.title.length) {
    saveEditTodo(todo);
    defaultEditedTodo.value = editedTodo.value = {};
  }
};

const saveTodoAction = () => {
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
    saveTodo(todo);
    createdTodo.value = ""; // reset todo input
  }
};

// call confirm delete todo modal
const deleteNoteTodo = (todo) => {
  modalActionComposition("deleteTodo", todo, true);
};

onUnmounted(() => {
  createdTodo.value = "";
  editedTodo.value = {};
});
</script>

<style scoped>
@import "../styles/todo.css";
</style>
