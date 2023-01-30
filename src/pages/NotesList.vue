<template>
  <div class="card">
    <h2 class="title">Список заметок</h2>

    <div class="overflow-content">
      <li v-for="note in computedNotes" :key="note.id">
        <span
          class="note-title"
          :class="note.complited ? 'note-complited' : ''"
          @click="showForm(true, note.id, 'update')"
        >
          {{ note.title }}
        </span>
        <div class="delete-button">
          <!-- Delete Note -->
          <span @click="modalActionComposition('deleteNote', note.id, true)"
            >Удалить</span
          >
        </div>
      </li>
    </div>

    <div>
      <button class="button" @click="showForm(true, null, 'create')">
        Новая заметка
      </button>
    </div>
  </div>
</template>

<script setup>
import { computedNotes, showForm } from "../composables/useNote";
import modalActionComposition from "../composables/useModalAction";
</script>

<style scoped>
@import "../styles/notePage.css";
</style>
