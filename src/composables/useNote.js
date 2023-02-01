import { computed, ref } from "vue";

// state notes
export const notes = ref(
  localStorage.notes?.length ? JSON.parse(localStorage.notes) : []
);

export const form = ref({}); // create/edit note form
export const action = ref(""); // action create/update
export const defaultNote = ref({}); // save initial data for rollback note
export const noteFormPage = ref(false); // show form note page
// get last id from notes array for created note
export const lastId = computed(() =>
  notes?.value.length ? Math.max(...notes?.value.map((note) => note.id)) : 0
);

// title for form page
export const computedTitle = computed(() => {
  return action.value == "update" ? "Изменение заметки" : "Новая заметка";
});

export const computedNotes = computed(() => {
  // checking if an array is empty
  if (notes.value.length) {
    // convert note data to user readable format "veritatis (dolorem,voluptatem,+2)"
    return notes.value
      .map((note) => {
        return {
          id: note.id,
          //noteTitle(task1,task2,+{tasks.length number})
          title: `${note.title}
                ${
                  note.todos.length
                    ? // select first 2 notes
                      ` (${note.todos?.slice(0, 2).map((i) => i["title"])}${
                        note.todos?.length > 2
                          ? // show number of undisplayed todos length if more than 2 todos
                            `,+${note.todos?.length - 2})`
                          : ")"
                      }`
                    : " (задач нет)" // if note not have todos
                }`,
          // info if all todos complited
          complited:
            !!note.todos.length &&
            note.todos.filter((todo) => !todo.complited).length == 0,
        };
      })
      .sort((a, b) => Number(b.id) - Number(a.id));
  } else {
    return []; // return if notes empty
  }
});

// show form page
export const showForm = (noteId = null, actionForm = "") => {
  noteFormPage.value = true;
  form.value =
    actionForm === "update"
      ? Object.assign(
          {},
          JSON.parse(
            JSON.stringify(notes.value.find((note) => note.id === noteId))
          )
        )
      : {};
  action.value = actionForm;
};

// save note in notes and localstorage
export const saveNote = (noteForm) => {
  // check action note create\update
  if (action.value === "update" && noteForm.title.length) {
    noteFormPage.value = false; // close form page
    localStorage.notes = JSON.stringify(
      (notes.value = notes.value.map(
        (note) => (note = note.id === noteForm.id ? noteForm : note)
      ))
    );
    action.value = "";
  } else {
    // check length note title and save
    if (noteForm.title.length) {
      notes.value.push(noteForm);
      localStorage.notes = JSON.stringify(notes.value);
      noteFormPage.value = false;
    }
  }
};

// close form page and rollback note
export const cancelEditNote = () => {
  notes.value = notes.value.map(
    (note) =>
      (note = note.id === defaultNote.value.id ? defaultNote.value : note)
  );
  noteFormPage.value = false;
};

// delete note from localstorage and notes
export const deleteNote = (noteId) => {
  // delete note from notes and localstorage
  localStorage.notes = JSON.stringify(
    (notes.value = notes.value.filter((note) => note.id !== noteId))
  );
};
