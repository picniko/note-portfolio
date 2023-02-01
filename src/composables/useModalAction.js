import { computed, ref } from "vue";
import { deleteTodo } from "../composables/TodoComposable";
import { deleteNote, cancelEditNote } from "../composables/useNote";
export const showModal = ref(false);
export let text = "";
export let title = "";
let entityAction = "";
let entityId = 0;
// methods for confirm acion
export const acceptAction = () => {
  entityAction === "deleteNote"
    ? deleteNote(entityId)
    : entityAction === "cancelEditNote"
    ? cancelEditNote()
    : deleteTodo(entityId);
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
  text = computed(() => {
    return (
      "Вы уверены, что хотите " +
        modalActionText.find((modalText) => modalText[modalAction])[modalAction]
          .text ?? "Error 500"
    );
  });
  title = computed(() => {
    return (
      modalActionText.find((modalText) => modalText[modalAction])[modalAction]
        .title ?? "Error 500"
    );
  });

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
        title: "Отмена изменения заметки!",
        text: "отменить редактирование заметки?",
      },
    },
  ];
  if (showModalDialog) showModal.value = true;
};

export default modalActionComposition;
