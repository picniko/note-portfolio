import { computed, ref } from "vue";

export const notes = ref(
  localStorage.notes?.length ? JSON.parse(localStorage.notes) : []
);

export const form = ref({});
// save initial data for rollback
// eslint-disable-next-line prettier/prettier
export const defaultNote = ref({});
export const action = ref("");
export const noteFormPage = ref(false);
//computed note title with todos
export const computedNotes = computed(() => {
  // checking if an array is empty
  if (notes.value.length) {
    // convert note data to user readable format "veritatis (dolorem,voluptatem,+2)"
    return notes.value
      .map((note) => {
        return {
          id: note.id,
          title: `${note.title}
                ${
                  note.todos.length
                    ? ` (${note.todos?.slice(0, 2).map((i) => i["title"])}${
                        note.todos?.length > 2
                          ? `,+${note.todos?.length - 2})`
                          : ")"
                      }`
                    : " (задач нет)"
                }`,
          complited:
            !!note.todos.length &&
            note.todos.filter((todo) => !todo.complited).length == 0,
        };
      })
      .sort((a, b) => Number(b.id) - Number(a.id));
  } else {
    return [];
  }
});

export const showForm = (
  showFormPage = false,
  noteId = null,
  actionForm = ""
) => {
  noteFormPage.value = showFormPage;
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

export const deleteNote = (noteId) => {
  // delete note from notes and localstorage
  localStorage.notes = JSON.stringify(
    (notes.value = notes.value.filter((note) => note.id !== noteId))
  );
};

export const cancelEditNote = () => {
  notes.value = notes.value.map(
    (note) =>
      (note = note.id === defaultNote.value.id ? defaultNote.value : note)
  );
  noteFormPage.value = false;
};

export const saveNote = (noteForm) => {
  // save note in notes and localstorage
  if (action.value === "update" && noteForm.title.length) {
    noteFormPage.value = false;
    localStorage.notes = JSON.stringify(
      (notes.value = notes.value.map(
        (note) => (note = note.id === noteForm.id ? noteForm : note)
      ))
    );
    action.value = "";
  } else {
    if (noteForm.title.length) {
      notes.value.push(noteForm);
      localStorage.notes = JSON.stringify(notes.value);
      noteFormPage.value = false;
    }
  }
};
