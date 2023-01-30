<template>
  <transition name="fade" mode="out-in">
    <NotesList v-if="!noteFormPage" />
    <NoteForm v-else />
  </transition>

  <transition name="modal">
    <ModalAction v-if="showModal" />
  </transition>
</template>

<script setup>
import { onMounted } from "vue";
import NoteForm from "./pages/NoteForm.vue";
import NotesList from "./pages/NotesList.vue";
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
@import "./styles/global.css";
@import "./styles/transitions,css";
</style>
