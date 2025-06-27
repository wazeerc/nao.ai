<script setup>
const store = useChatStore();
const themeStore = useThemeStore();
const chatContainer = ref(null);

watch(() => store.messages, () => {
  nextTick(() => {
    if (chatContainer.value)
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  });
}, { deep: true });
</script>

<template>
  <section ref="chatContainer"
           class="flex flex-col gap-4 w-full overflow-y-auto pb-4 rounded">
    <div v-if="!store.messages.length"
         class="grid place-content-center h-full">
      <div class="flex flex-col items-center text-center">
        <img src="/ollama.webp"
             alt="Ollama Logo"
             class="w-60 opacity-10 mb-2 motion-preset-focus-lg motion-delay-300">
        <p class="font-semibold mt-2 motion-preset-slide-up-md motion-delay-500 transition-colors duration-300"
           :class="themeStore.isDark ? 'text-slate-400' : 'text-slate-500'">
          nao.ai, Open-Source AI at your fingertips.
        </p>
      </div>
    </div>

    <template v-for="(message, index) in store.messages"
              :key="index">
      <div class="flex flex-col w-full gap-4"
           :class="message.isUser ? 'items-end' : 'items-start'">
        <ChatBubble :message="message.text"
                    :isUser="message.isUser"
                    :isLoading="!message.isUser && index === store.messages.length - 1 && store.isLoading" />
      </div>
    </template>
  </section>
</template>