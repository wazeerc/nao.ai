import tailwindcss from "@tailwindcss/vite";
import { resolve } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  runtimeConfig: {
    public: {
      API: process.env.oLlama_API,
    }
  },
  ssr: false,
  vite: {
    plugins: [
      tailwindcss(),
    ]
  }
});
