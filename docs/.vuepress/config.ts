import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import MarkdownItPlantuml from 'markdown-it-plantuml';

export default defineUserConfig({
  // Замінити на назву свого репозиторія
  base: "/coursework_database/",

  lang: "en-US",
  // Замінити на назву свого проєкту
  title: "Система управління проєктами",
  description: "Курсова робота",

  theme,

  extendsMarkdown: md =>{
    md.use(MarkdownItPlantuml);
  },
});
