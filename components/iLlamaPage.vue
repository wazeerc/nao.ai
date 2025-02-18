<script setup>
const store = useChatStore();

const config = useRuntimeConfig();
const model = config.public.llamaModel;
</script>

<template>
  <aside class="inline-flex w-full mb-1 items-center justify-between">
    <p class="p-1 text-slate-600 font-medium text-sm italic">Model: {{ model }}</p>
    <UButton icon="i-heroicons-arrow-path"
             size="md"
             color="neutral"
             variant="ghost"
             @click="store.resetChat"
             :disabled="!store.messages.length" />
  </aside>
  <main class="flex flex-col gap-4 p-6 bg-zinc-950 rounded-lg shadow-lg
        border-2 border-zinc-800/40 h-[80vh] w-[80vw] relative">
    <div class="flex w-full overflow-y-auto shadow p-2">
      <ChatWindow />
    </div>
    <div class="mt-auto">
      <ChatInput />
    </div>
  </main>
</template>