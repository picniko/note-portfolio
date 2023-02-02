<template>
  <transition name="modal">
    <div class="modal-dialog" v-if="showModal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <!-- modal title -->
          <h2>{{ title }}</h2>
          <!-- modal text -->
          <p>{{ text }}</p>

          <!-- modal buttons  -->
          <div class="footer">
            <!-- cancel  -->
            <button class="warning-button" @click="cancelAction">Отмена</button>

            <!-- confirm -->
            <button class="success-button" @click="acceptAction">Да</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import {
  title,
  text,
  showModal,
  acceptAction,
  cancelAction,
} from "../composables/ModalActionComposable";
</script>

<style>
@import "../styles/modal.css";
</style>
