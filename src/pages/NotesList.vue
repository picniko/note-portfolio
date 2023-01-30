<template>
  <!-- Notes page card -->
  <div class="card">
    <!-- Title -->
    <h2 class="title">Список заметок</h2>

    <div class="overflow-content">
      <!-- notes list -->
      <li v-for="note in computedNotes" :key="note.id">
        <span
          class="note-title"
          :class="note.complited ? 'note-complited' : ''"
          @click="showForm(note.id, 'update')"
        >
          {{ note.title }}
        </span>

        <!-- Delete Note -->
        <div class="delete-button">
          <!-- call modal dialog for delete note -->
          <span @click="modalActionComposition('deleteNote', note.id, true)">
            Удалить
          </span>
        </div>
      </li>
    </div>

    <div>
      <!-- eslint-disable-next-line prettier/prettier -->
      <button class="button" @click="showForm(null, 'create')">Новая заметка</button>
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
