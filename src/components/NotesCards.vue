<template>
  <div class="wrapper">
    <div class="content" v-for="note in notes" :key="note.id">
      <!-- Notes page card -->
      <li class="note">
        <div class="details" @click="showForm(note.id, 'update')">
          <!-- note title -->
          <p style="cursor: pointer">
            {{ note.title }}
          </p>

          <!-- note todos -->
          <span
            v-for="todo in note.todos.slice(0, 2)"
            :key="todo.id"
            style="font-size: 14px"
            >{{ todo.title }}</span
          >
          <!-- first 2 todos title -->
          <span
            v-if="note.todos.length > 2"
            style="font-size: 14px; color: gray"
            >(+ {{ note.todos.length - 2 }} задачи)</span
          >
        </div>
        <div class="bottom-content">
          <span>{{ note.created }}</span>
          <!-- delete note button icon -->
          <div
            class="settings"
            @click="modalActionComposition('deleteNote', note.id, true)"
          >
            <mdicon
              name="delete-sweep-outline"
              size="20"
              class="uil uil-ellipsis-h"
              style="color: #f95656"
            />
          </div>
        </div>
      </li>
    </div>

    <!-- new note card link -->
    <div class="content">
      <li class="add-box" @click="showForm(null, 'create')">
        <div class="icon">
          <mdicon
            name="note-plus-outline"
            size="20"
            class="uil uil-ellipsis-h"
          />
        </div>
        <p>Новая заметка</p>
      </li>
    </div>
  </div>
</template>

<script setup>
import { notes, showForm } from "../composables/NoteComposable";
import modalActionComposition from "../composables/ModalActionComposable";
</script>

<style scoped>
@import "../styles/noteCards.css";
</style>
