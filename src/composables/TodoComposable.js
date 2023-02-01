import { computed, ref } from "vue";
import { notes, form as noteForm, action } from "./useNote";

export const createdTodo = ref("");
export const editedTodo = ref({});
export const defaultEditedTodo = ref({});

export const saveTodo = (todo) => {
  console.log(action.value);
  noteForm.value.todos.push(todo);
};

export const saveEditTodo = (editTodo) => {
  // save note in notes and localstorage
  localStorage.notes = JSON.stringify(
    (notes.value = notes.value.filter(
      (note) =>
        (note.todos = note.todos.map(
          (todo) => (todo = todo.id === editTodo.id ? editTodo : todo)
        ))
    ))
  );
  noteForm.value.todos = noteForm.value.todos.filter(
    (todo) => (todo = todo.id === editTodo.id ? editTodo : todo)
  );
};

export const cancelEditTodo = (todoId) => {
  noteForm.value.todos = noteForm.value.todos.map(
    (todo) => (todo = todo.id === todoId ? defaultEditedTodo.value : todo)
  );
  defaultEditedTodo.value = editedTodo.value = {};
};

export const deleteTodo = (todoId) => {
  noteForm.value.todos = noteForm.value.todos.filter(
    (todo) => todo.id !== todoId
  );
};

// export const cancelEditTodo = (todo) => {};

// Individual id for todo
export const idForCreatedTodo = computed(() => {
  return noteForm.value.todos?.length // check note on exist todos
    ? Math.max(...noteForm.value.todos.map((todo) => todo.id)) + 1 // if
    : notes.value.length
    ? 1 +
      Math.max(
        ...notes.value

          .map((note) =>
            note?.todos.length ? note.todos.map((todo) => todo.id) : 0
          )
          .flat(1)
      )
    : 1;
});
