<template>
  <div class="card">
    <h2 class="title">
      {{ computedTitle }}
    </h2>
    <!-- Note form -->
    <form>
      <!-- Note Title -->
      <div>
        <input
          type="text"
          autofocus
          class="note-input"
          v-model="form.title"
          placeholder="Введите название заметки"
          @keydown.enter.prevent="saveNote(form)"
        />
      </div>

      <!-- Note todos -->
      <FormTodos
        :form="form"
        @addTodo="addTodo"
        :notes="notes"
        :deleteTodo="deleteTodo"
      />

      <button
        class="button"
        :class="form.title?.length ? 'half' : ''"
        @click.prevent="cancelForm"
      >
        Отмена
      </button>
      <button
        class="half success button"
        type="submit"
        @click.prevent="saveNote(form)"
        v-if="form.title"
      >
        Сохранить
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import FormTodos from "@/components/FormTodos.vue";
// eslint-disable-next-line prettier/prettier
import {
  action,
  notes,
  form,
  noteFormPage,
  saveNote,
  defaultNote,
} from "../composables/useNote";
import modalActionComposition from "../composables/useModalAction";

// prepare id for new note
// eslint-disable-next-line prettier/prettier
const lastId = notes?.value.length ? Math.max(...notes?.value.map((note) => note.id)) : 0;

const computedTitle = computed(() => {
  return action.value == "update" ? "Изменение заметки" : "Новая заметка";
});
const addTodo = (todo) => {
  form.value.todos.push(todo);
};
const deleteTodo = (todo) => {
  console.log(todo);
  // eslint-disable-next-line prettier/prettier
  form.value.todos = form.value.todos.filter((note_todo) => note_todo.id !== todo.id);
};

const cancelForm = () => {
  action.value === "update" &&
  JSON.stringify(defaultNote.value) !== JSON.stringify(form.value)
    ? modalActionComposition("cancelEditNote", null, true)
    : (noteFormPage.value = false);
};

onMounted(() => {
  if (action.value === "create") {
    form.value = {
      todos: [],
      title: "",
      id: lastId + 1 ?? 1,
      created: new Date().toLocaleDateString(),
    };
  } else {
    // eslint-disable-next-line prettier/prettier
    defaultNote.value = Object.assign({}, JSON.parse(JSON.stringify(form.value)));
  }
});
</script>

<style>
@import "../styles/form.css";
</style>
