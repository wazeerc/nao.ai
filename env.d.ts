/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LLAMA_MODEL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
