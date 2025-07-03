<script setup>
const chatStore = useChatStore();
const ragStore = useRagStore();

const reset = async () => {
  chatStore.resetChat();
  await ragStore.resetDocuments();
};
const isResetDisabled = computed(() => !chatStore.messages.length && !ragStore.documents.length);

const config = useRuntimeConfig();
const model = config.public.ollamaModel;
</script>

<template>
  <div>
    <header>
      <div
        class="absolute top-3 left-3 shadow-xs
             hover:motion-preset-stretch hover:motion-delay-100
             motion-preset-slide-right motion-delay-800
             inline-flex items-center justify-center
             bg-blue-200/80 dark:bg-slate-800/80
             px-2 py-1
             rounded-full select-none
             border border-blue-900/50 dark:border-blue-100/50"
      >
        <span class="font-semibold text-xs leading-none">beta</span>
      </div>
      <ClientOnly>
        <ThemeToggle />
      </ClientOnly>
    </header>
    <aside
      class="inline-flex w-full mb-2 items-center justify-between motion-preset-slide-down motion-delay-700"
    >
      <p
        class="px-1 font-medium text-sm italic transition-colors duration-300 text-slate-600 dark:text-slate-400"
      >
        {{ model ?? '' }}
      </p>
      <UButton
        icon="i-heroicons-arrow-path"
        class="cursor-pointer"
        size="md"
        color="neutral"
        variant="outline"
        :disabled="isResetDisabled"
        :aria-label="!isResetDisabled ? 'Reset chat and documents' : 'Nothing to reset'"
        :title="!isResetDisabled ? 'Reset chat and documents' : 'Nothing to reset'"
        @click="reset"
      />
    </aside>
    <main
      class="flex flex-col gap-4 p-6 rounded-lg shadow-lg border-4 h-[80vh] w-[80vw] relative motion-preset-fade-sm transition-all duration-400 ease-in bg-slate-100/20 border-slate-200/50 dark:bg-zinc-900/80 dark:border-gray-900/40"
    >
      <div class="flex w-full h-full overflow-y-auto p-2">
        <ChatWindow />
      </div>
      <div class="mt-auto">
        <ChatInput />
      </div>
    </main>
    <footer
      class="absolute bottom-3 right-3 text-right text-xs invert opacity-50 font-serif
                   motion-preset-focus motion-delay-800"
    >
      © <a
        href="https://github.com/wazeerc"
        target="_blank"
      >wazeerc <span class="sr-only">(opens in new tab)</span></a> 2025
    </footer>
  </div>
</template>
