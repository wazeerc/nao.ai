<template>
  <aside class="inline-flex w-full mb-1 items-end justify-end">
    <UButton icon="i-heroicons-arrow-path"
             size="md"
             color="neutral"
             variant="ghost"
             @click="console.log('Reset!')" />
  </aside>
  <main class="flex flex-col gap-4 p-6 bg-zinc-950 rounded-lg shadow-lg
        border-2 border-zinc-800/40 h-[80vh] w-[80vw] relative">
    <div class="flex w-full">
      <ChatWindow />
    </div>
    <div class="mt-auto">
      <ChatInput />
    </div>
  </main>
</template>