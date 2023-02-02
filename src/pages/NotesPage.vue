<template>
  <!-- link on github project -->
  <a target="_blank" href="https://github.com/picniko/note-portfolio">
    <mdicon name="github" size="31" class="github" />
  </a>
  <!-- Page title with button icons -->
  <div>
    <transition name="no-mode-fade" mode="out-in">
      <!-- cards grid view -->
      <div v-if="showCards" class="page-icon">
        <mdicon name="format-list-bulleted" size="31" @click="changeView" />
      </div>
      <!-- list view -->
      <div v-else class="page-icon">
        <mdicon name="dots-grid" size="31" @click="changeView" />
      </div>
    </transition>
  </div>
  <h1 class="page-title">Мои заметки</h1>

  <!-- View page cards or list -->
  <transition name="fade" mode="out-in">
    <!-- cards -->
    <div v-if="showCards">
      <NotesCards />
    </div>
    <!-- list -->
    <div v-else>
      <NotesList />
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";
import NotesList from "@/components/NotesList.vue";
import NotesCards from "@/components/NotesCards.vue";

//cards grid view
const showCards = ref(
  (localStorage.showCards && localStorage.showCards === "true") ?? true
);
// change view on cards or list and save in localstorage
const changeView = () => {
  showCards.value = !showCards.value;
  localStorage.showCards = showCards.value;
};
</script>

<style scoped>
@import "../styles/notePage.css";
</style>
