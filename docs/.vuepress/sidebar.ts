import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Вступ",
      // icon: "laptop-code",
      prefix: "intro/",
      link: "intro/",
    },
    {
      text: "Розроблення загальних вимог до системи",
      // icon: "laptop-code",
      prefix: "requirements",
      link: "requirements/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "Розроблення вимог до функціональної системи",
      // icon: "laptop-code",
      prefix: "use cases/",
      link: "use cases/",
    },
    {
      text: "Проєктування інформаційного забезпечення",
      // icon: "laptop-code",
      prefix: "design/",
      link: "design/",
    },
    {
      text: "Реалізація інформаційного та програмного забезпечення",
      // icon: "laptop-code",
      prefix: "software/",
      link: "software/",
    },
    {
      text: "Тестування процездатності системи",
      // icon: "laptop-code",
      prefix: "test/",
      link: "test/",
    },
    {
      text: "Висновки",
      // icon: "laptop-code",
      prefix: "conclusion/",
      link: "conclusion/",
    },
  ],
});
