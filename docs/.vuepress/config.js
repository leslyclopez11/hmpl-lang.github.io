import { defineUserConfig } from "vuepress/cli";
import { viteBundler } from "@vuepress/bundler-vite";
import { searchPlugin } from "@vuepress/plugin-search";
import { shikiPlugin } from "@vuepress/plugin-shiki";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  lang: "en-US",
  title: "HMPL.js",
  description: "Template language for displaying UI from server to client",
  port: 3000,

  theme: hopeTheme({
    logo: "/images/logo.svg",

    navbar: [
      // NavbarLink
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Docs",
        link: "/docs",
      },
      {
        text: "GitHub",
        link: "https://github.com/hmpl-lang/hmpl",
      },
      {
        text: "Examples",
        link: "https://github.com/hmpl-lang/examples",
      },
      {
        text: "Blog",
        link: "https://hmpl-lang.github.io/blog",
      },
      {
        text: "Why hmpl?",
        link: "#why-hmpl",
      },
    ],

    iconAssets: "fontawesome-with-brands",

    sidebar: [
      {
        text: "Introduction",
        link: "introduction.md",
      },
      {
        text: "Installation",
        link: "installation.md",
      },
      {
        text: "Getting started",
        link: "getting-started.md",
      },
      {
        text: "hmpl",
        link: "hmpl.md",
        children: [
          {
            text: "compile",
            link: "hmpl.md#compile",
          },
          {
            text: "stringify",
            link: "hmpl.md#stringify",
          },
        ],
      },
      {
        text: "Webpack",
        link: "webpack.md",
      },
      {
        text: "Examples",
        link: "examples.md",
      },
      {
        text: "About",
        collapsible: false,
        expanded: true,
        path: "/about/",
        children: [
          {
            text: "Discussion and development of an open-source project",
            link: "discussion-and-development-of-an-open-source-project.md",
          },
          {
            text: "GitHub repository with examples",
            link: "github-repository-with-examples.md",
          },
          {
            text: "Server-side rendering",
            link: "server-side-rendering.md",
          },
        ],
      },
      {
        text: "Changelog",
        link: "changelog.md",
      },
    ],
  }),
  head: [["link", { rel: "icon", href: "/images/favicon.ico" }]],
  plugins: [
    searchPlugin(),
    shikiPlugin({
      langAlias: {
        hmpl: "html",
      },
      theme: "min-light",
    }),
  ],
  bundler: viteBundler(),
});
