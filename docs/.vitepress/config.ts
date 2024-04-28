import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Revue code TP02",
  description: "Revue de code du TP02 de Adam Royer et Charles Rocheleau",
  base: '/appweb-trpr02/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})