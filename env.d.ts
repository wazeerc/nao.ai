/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NUXT_PUBLIC_OLLAMA_MODEL: string;
  readonly NUXT_PUBLIC_EMBEDDING_MODEL: string;
  readonly NUXT_PUBLIC_OLLAMA_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
