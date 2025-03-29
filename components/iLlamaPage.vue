<script setup>
const store = useChatStore();

const config = useRuntimeConfig();
const model = config.public.llamaModel;
</script>

<template>
  <aside
         class="inline-flex w-full mb-1 items-center justify-between motion-preset-slide-down motion-delay-700">
    <p class="p-1 text-slate-500 font-medium text-sm italic">{{ model ?? '' }}</p>
    <UButton icon="i-heroicons-arrow-path"
             size="md"
             color="neutral"
             variant="ghost"
             @click="store.resetChat"
             :disabled="!store.messages.length" />
  </aside>
  <main class="flex flex-col gap-4 p-6 bg-zinc-900/40 rounded-lg shadow-xl
        border-4 border-zinc-900/40 h-[80vh] w-[80vw] relative motion-preset-slide-up">
    <div class="flex w-full h-full overflow-y-auto p-2">
      <ChatWindow />
    </div>
    <div class="mt-auto">
      <ChatInput />
    </div>
  </main>
</template>