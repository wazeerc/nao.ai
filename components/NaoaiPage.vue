<script setup>
const store = useChatStore();

const config = useRuntimeConfig();
const model = config.public.llamaModel;
</script>

<template>
    <aside
           class="inline-flex w-full mb-1 items-center justify-between motion-preset-slide-down motion-delay-700">
      <p class="p-1 font-medium text-sm italic transition-colors duration-300 text-slate-600 dark:text-slate-400">
        {{ model ?? '' }}
      </p>
      <UButton icon="i-heroicons-arrow-path"
               size="md"
               color="neutral"
               variant="ghost"
               @click="store.resetChat"
               :disabled="!store.messages.length" />
    </aside>

    <main class="flex flex-col gap-4 p-6 rounded-lg shadow-lg border-4 h-[80vh] w-[80vw] relative motion-preset-fade-sm transition-all duration-400 ease-in bg-slate-100/20 border-slate-200/50 dark:bg-zinc-900/80 dark:border-gray-900/40">
      <div class="flex w-full h-full overflow-y-auto p-2">
        <ChatWindow />
      </div>
      <div class="mt-auto">
        <ChatInput />
      </div>
    </main>
</template>