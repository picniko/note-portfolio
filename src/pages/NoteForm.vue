<template>
  <div class="card">
    <!-- computed title(create or edit) for note -->
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
          v-model.trim="form.title"
          placeholder="Введите название заметки"
          @keydown.enter.prevent="saveNote(form)"
        />
      </div>

      <!-- Note todos card info -->
      <FormTodos />

      <!-- canel and confirm note form -->
      <button
        class="cancel-button"
        :class="form.title?.length && !editedTodo.id ? 'half' : ''"
        @click.prevent="cancelForm"
      >
        Отмена
      </button>
      <button
        class="half success-button"
        type="submit"
        @click.prevent="saveNote(form)"
        v-if="form.title && !editedTodo.id"
      >
        Сохранить
      </button>
    </form>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import FormTodos from "@/components/FormTodos.vue";
import { editedTodo } from "@/composables/TodoComposable";
import modalActionComposition from "../composables/ModalActionComposable";
import {
  action,
  form,
  noteFormPage,
  saveNote,
  defaultNote,
  lastId,
  computedTitle,
} from "../composables/NoteComposable";
const cancelForm = () => {
  action.value === "update" &&
  JSON.stringify(defaultNote.value) !== JSON.stringify(form.value)
    ? modalActionComposition("cancelEditNote", null, true)
    : (noteFormPage.value = false);
};

onMounted(() => {
  // prepare form for note
  if (action.value === "create") {
    form.value = {
      title: "",
      todos: [],
      id: lastId.value + 1 ?? 1,
      created: new Date().toLocaleDateString(),
    };
  } else {
    //save initial note for cancel
    defaultNote.value = Object.assign(
      {},
      JSON.parse(JSON.stringify(form.value))
    );
  }
});
</script>

<style>
@import "../styles/form.css";
</style>
