import tailwindcss from "@tailwindcss/vite";
import { resolve } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'nao.ai - Your Local AI Assistant',
      meta: [
        { name: 'description', content: 'A web interface for interacting with local language models.' }
      ],
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
    '@pinia/nuxt'
  ],
  ssr: false,
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  runtimeConfig: {
    public: {
      llamaModel: process.env.NUXT_PUBLIC_LLAMA_MODEL
    }
  }
});
