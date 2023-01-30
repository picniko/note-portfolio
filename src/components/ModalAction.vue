<template>
  <transition name="modal">
    <div class="modal-mask" v-if="showModal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h2>{{ title }}</h2>
          <p>{{ text }}</p>
          <div style="display: flex">
            <!-- eslint-disable-next-line prettier/prettier -->
            <button class="half warning button" @click="cancelAction">Отмена</button>
            <!-- eslint-disable-next-line prettier/prettier -->
            <button class="half success button" @click="acceptAction">Да</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
// eslint-disable-next-line prettier/prettier
import {
  title,
  text,
  showModal,
  acceptAction,
  cancelAction,
} from "../composables/useModalAction";
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-container button {
  width: 45%;
  cursor: pointer;
  padding: 10px 0;
  margin: 0px 5px 0px 5px;
  background: #6fd649;
  color: #fff;
  border: 0;
  outline: 0;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>
