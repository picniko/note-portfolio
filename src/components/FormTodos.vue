<template>
  <h3>Задачи:</h3>
  <div class="todo-input">
    <!-- input for create todo -->
    <div style="display: flex; justify-content: center; color: #3cef3994">
      <input
        type="text"
        v-model="createdTodo"
        placeholder="Новая задача"
        @keydown.enter.prevent="saveTodoAction"
      />
      <!-- eslint-disable-next-line prettier/prettier -->
      <div style="margin-bottom: 7px; width 50px">
        <mdicon name="receipt-text-plus" size="36" @click="saveTodoAction" />
      </div>
    </div>
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
          <!-- eslint-disable-next-line prettier/prettier -->
          <span class="todo-title" :class="todo.complited ? 'todo-complited' : ''">
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
  <div style="color: gray">
    Выполнено:
    {{ form.todos?.filter((todo) => todo.complited).length ?? 0 }} /
    {{ form.todos?.length ?? 0 }}
  </div>
</template>

<script setup>
import { form } from "../composables/useNote";
import modalActionComposition from "../composables/useModalAction";

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
