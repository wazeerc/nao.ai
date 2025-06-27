import { resolve } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'nao.ai - Your Local AI Assistant',
      meta: [
        { name: 'description', content: 'A web interface for interacting with local language models.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/naoai-logo.svg' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/naoai-logo.svg' },
        { rel: 'icon', type: 'image/svg+xml', sizes: '32x32', href: '/naoai-logo.svg' },
        { rel: 'icon', type: 'image/svg+xml', sizes: '16x16', href: '/naoai-logo.svg' }
      ]
    }
  },
  alias: {
    "@": resolve(__dirname, "./"),
    "@utils": resolve(__dirname, "./utils/index.ts"),
  },
  compatibilityDate: '2024-11-01',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/color-mode'
  ],
  ssr: false,
  vite: {
    plugins: []
  },
  runtimeConfig: {
    public: {
      llamaModel: process.env.NUXT_PUBLIC_LLAMA_MODEL
    }
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
  },
});
