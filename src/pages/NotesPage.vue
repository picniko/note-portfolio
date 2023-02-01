<template>
  <!-- Page title with button icons -->
  <h1 class="page-title">
    <transition name="no-mode-fade" mode="out-in">
      <mdicon
        name="format-list-bulleted"
        v-if="showCards"
        class="page-icon"
        size="31"
        @click="changeView"
      />

      <mdicon
        name="dots-grid"
        v-else
        class="page-icon"
        size="31"
        @click="changeView"
      />
    </transition>
    Мои заметки
  </h1>

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

const showCards = ref(localStorage.showCards === "true" ?? true);
const changeView = () => {
  showCards.value = !showCards.value;
  localStorage.showCards = showCards.value;
};
</script>

<style scoped>
@import "../styles/notePage.css";
.page-title {
  color: white;
  cursor: pointer;
  margin-top: 15px;
}
.page-icon {
  color: white;
  cursor: pointer;
}
</style>
