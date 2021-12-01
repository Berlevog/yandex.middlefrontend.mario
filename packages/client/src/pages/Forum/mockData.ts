export const threads = [
  {
    id: 0,
    title: "Заголовок темы",
    content: "Какой-то очень важный вопрос от пользователя 🏩",
    date: "3.09.2021 13:38",
    user: {
      avatar: "/images/luigi.png",
      name: "User A.",
    },
  },
  {
    id: 1,
    title: "Ещё одна тема....",
    content:
      "Нам нужен форум! Срочно нужен форум! ⚠️🔥 Нам нужен форум! Срочно нужен форум! ⚠️🔥Нам нужен форум! Срочно нужен форум! ⚠️🔥Нам нужен форум! Срочно нужен форум! ⚠️🔥Нам нужен форум! Срочно нужен форум! ⚠️🔥Нам нужен форум! Срочно нужен форум! ⚠️🔥Нам нужен форум! Срочно нужен форум! ⚠️🔥Нам нужен форум! Срочно нужен форум! ⚠️🔥Нам нужен форум! Срочно нужен форум! ⚠️🔥",
    date: "7.09.2021 23:01",
    user: {
      name: "nick",
    },
  },
];

export const posts = [
  {
    id: 0,
    threadId: 1,
    date: "7.09.2021 23:03",
    user: { name: "commentatorOWNZ", avatar: "/img/av1.png" },
    content: "комментируем...❕",
  },
  {
    id: 1,
    threadId: 1,
    date: "8.09.2021 08:22",
    user: { name: "ffff" },
    content: "верное замечание, форум очень нужен",
  },
  {
    id: 2,
    threadId: 1,
    date: "8.09.2021 22:00",
    user: { name: "commentatorOWNZ", avatar: "/img/av1.png" },
    content: "а я о чем..",
  },
  {
    id: 3,
    threadId: 0,
    date: "3.09.2021 21:15",
    user: { name: "commentatorOWNZ", avatar: "/img/av1.png" },
    content: "lorem lorem",
  },
  {
    id: 4,
    threadId: 0,
    date: "4.09.2021 14:52",
    user: { name: "engles" },
    content: "заходи по ссылке и регистрируйся",
  },
];

export const getPostsByThreadId = (threadId: number) => {
  return posts.filter((p) => p.threadId === threadId);
};

export const user = { name: "live user" };
