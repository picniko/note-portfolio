import { computed, ref } from "vue";
import { deleteTodo } from "./TodoComposable";
import { deleteNote, cancelEditNote } from "./NoteComposable";
export const showModal = ref(false);
export let text = "";
export let title = "";
let entityAction = "";
let entityId = 0;
// methods for confirm acion
export const acceptAction = () => {
  entityAction === "deleteNote"
    ? deleteNote(entityId) //delete note
    : entityAction === "cancelEditNote"
    ? cancelEditNote() //cancel edit note
    : deleteTodo(entityId); //delete todo
  showModal.value = false;
};

// close modal dialog
export const cancelAction = () => {
  showModal.value = false;
};

const modalActionComposition = (
  modalAction = "",
  payloadEntityId = 0,
  showModalDialog = false
) => {
  entityAction = modalAction;
  entityId = payloadEntityId;
  //computed title modal view
  title = computed(() => {
    return (
      modalActionText.find((modalText) => modalText[modalAction])[modalAction]
        .title ?? "Error 500"
    );
  });
  //computed text modal view
  text = computed(() => {
    return (
      "Вы уверены, что хотите " +
        modalActionText.find((modalText) => modalText[modalAction])[modalAction]
          .text ?? "Error 500"
    );
  });

  // make modal title and text from payload data
  let modalActionText = [
    {
      deleteNote: {
        title: "Заметка будет удалена!",
        text: "удалить заметку?",
      },
      deleteTodo: {
        title: "Задача будет удалена!",
        text: "удалить задачу?",
      },
      cancelEditNote: {
        title: "Отмена редактирования заметки!",
        text: "отменить последние изменение?",
      },
    },
  ];
  if (showModalDialog) showModal.value = true;
};

export default modalActionComposition;
