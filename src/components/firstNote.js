import { ref } from "vue";

export const firstNote = ref({
  id: 1,
  todos: [
    {
      id: 21,
      title: "Каждая заметка имеет название и список задач",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 22,
      title:
        "Каждый пункт Todo состоит из чекбокса и относящейся к нему текстовой подписи.",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 23,
      title: "Приложение состоит всего из 2х страниц",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 24,
      title: "На главной странице отображается список всех заметок.",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 25,
      title:
        "Для каждой заметки отображается заголовок и Todo, сокращенный до нескольких пунктов, без возможности отмечать",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 26,
      title: "Перейти к созданию новой заметки",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 27,
      title: "Перейти к изменению",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 28,
      title: "Удалить ",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 29,
      title:
        "Страница изменения заметки позволяет определенную заметку отредактировать, отметить пункты Todo, а после сохранить изменения.",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 30,
      title: "Сохранить изменения",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 31,
      title: "Отменить редактирование (необходимо подтверждение)",
      complited: false,
      created: "26.01.2023",
    },
    {
      id: 32,
      title: "Удалить (необходимо подтверждение)",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 33,
      title: "Отменить внесенное изменение",
      complited: false,
      created: "26.01.2023",
    },
    {
      id: 34,
      title: "Повторить отмененное изменение Действия с пунктами Todo:",
      complited: false,
      created: "26.01.2023",
    },
    {
      id: 35,
      title: "Добавить todo",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 36,
      title: "Удалить todo",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 37,
      title: "Отредактировать текст todo",
      complited: false,
      created: "26.01.2023",
    },
    {
      id: 38,
      title: "Отметить как выполненный todo",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 39,
      title:
        "Все действия на сайте должны происходить без перезагрузки страницы",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 40,
      title:
        "Подтверждение действий (удалить заметку) выполняется с помощью диалогового окна.",
      complited: false,
      created: "26.01.2023",
    },
    {
      id: 41,
      title: "Интерфейс должен отвечать требованиям usability.",
      complited: false,
      created: "26.01.2023",
    },
    {
      id: 42,
      title:
        "После перезагрузки страницы состояние списка заметок должно сохраняться.",
      complited: false,
      created: "26.01.2023",
    },
    {
      id: 43,
      title:
        "Можно пренебречь несоответствием редактирования текста с помощью кнопок отменить/повторить и аналогичным действиям с помощью комбинацияй клавиш (Ctrl+Z, Command+Z, etc.).",
      complited: false,
      created: "26.01.2023",
    },
    {
      id: 44,
      title:
        'Диалоговые окна должны быть реализованы без использования "alert", "prompt" и "confirm".',
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 45,
      title:
        "В качестве языка разработки допускается использовать JavaScript или TypeScript.",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 46,
      title: "В качестве сборщика, если это необходимо, используйте Webpack.",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 47,
      title:
        "Верстка должна быть выполнена без использования UI библиотек (например Vuetify).",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 48,
      title: "Адаптивность не обязательна, но приветствуется.",
      complited: true,
      created: "26.01.2023",
    },
    {
      id: 49,
      title:
        "Логика приложения должна быть разбита на разумное количество самодостаточных Vue-компонентов.",
      complited: false,
      created: "26.01.2023",
    },
    {
      id: 50,
      title:
        "Код должен быть написан понятно и аккуратно, с соблюдением табуляции и прочих элементов написания, без лишних элементов и функций, не имеющих отношения к функционалу тестового задания, снабжен понятными комментариями.",
      complited: false,
      created: "26.01.2023",
    },
    {
      id: 51,
      title: "Читабельность и наличие элементарной архитектуры.",
      complited: false,
      created: "26.01.2023",
    },
    {
      id: 52,
      title:
        "Чистота и оформление кода — не менее важный фактор. Код должен быть написан в едином стиле (желательно в рекомендуемом для конкретного языка). Также к чистоте относятся отсутствие копипаста и дублирования логики.",
      complited: false,
      created: "26.01.2023",
    },
    {
      id: 53,
      title:
        "Ссылка на публичный репозиторий (GitHub, BitBucket, GitLab) с исходным кодом.",
      complited: false,
      created: "26.01.2023",
    },
    {
      id: 54,
      title:
        "Ссылка на сайт для тестирования функционала. Или Dockerfile и docker-compose.yaml, позволяющие развернуть локально командой docker-compose up работоспособную копию сайта.ехническое заданиеехническое заданиеехническое задание",
      complited: false,
      created: "26.01.2023",
    },
  ],
  title: "Техническое задание",
  created: "26.01.2023",
});