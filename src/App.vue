<template>
  <transition name="fade" mode="out-in">
    <!-- notes list page -->
    <div v-if="!noteFormPage">
      <NotesPage />
    </div>

    <!-- note form page -->
    <div v-else>
      <NoteForm />
    </div>
  </transition>

  <!-- confirm modal dialog -->
  <transition name="modal">
    <ModalAction v-if="showModal" />
  </transition>
</template>

<script setup>
import { onMounted } from "vue";
import NotesPage from "./pages/NotesPage.vue";
import NoteForm from "./pages/NoteForm.vue";
import ModalAction from "./components/ModalAction.vue";
import { noteFormPage, notes } from "./composables/useNote";
import { showModal } from "./composables/useModalAction";
import { firstNote } from "./components/firstNote";

onMounted(async () => {
  if (!localStorage.firstLoad) {
    await notes.value.push(firstNote.value);
    localStorage.notes = JSON.stringify(notes.value);
    localStorage.firstLoad = false;
  }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
@import "./styles/global.css";
@import "./styles/transitions.css";
</style>
