import { computed, ref } from "vue";
import { notes, form as noteForm } from "./NoteComposable";

export const createdTodo = ref("");
export const editedTodo = ref({});
export const defaultEditedTodo = ref({});

// save todo in noteForm
export const saveTodo = (todo) => {
  noteForm.value.todos.push(todo);
};

// save editedTodo in noteForm
export const saveEditTodo = (editTodo) => {
  noteForm.value.todos = noteForm.value.todos.filter(
    (todo) => (todo = todo.id === editTodo.id ? editTodo : todo)
  );
};

// rollback todo
export const cancelEditTodo = (todoId) => {
  noteForm.value.todos = noteForm.value.todos.map(
    (todo) => (todo = todo.id === todoId ? defaultEditedTodo.value : todo)
  );
  defaultEditedTodo.value = editedTodo.value = {};
};

// delete todo from noteForm
export const deleteTodo = (todoId) => {
  noteForm.value.todos = noteForm.value.todos.filter(
    (todo) => todo.id !== todoId
  );
};

// export const cancelEditTodo = (todo) => {};

// Individual id for todo
export const idForCreatedTodo = computed(() => {
  return noteForm.value.todos?.length // check note on exist todos
    ? Math.max(...noteForm.value.todos.map((todo) => todo.id)) + 1 // find max id in note todos and ++
    : notes.value.length //check existing notes
    ? 1 +
      Math.max(
        ...notes.value

          .map((note) =>
            note?.todos.length ? note.todos.map((todo) => todo.id) : 0
          )
          .flat(1)
      ) //if notes exists get max id from all note
    : 1; //else first id
});
