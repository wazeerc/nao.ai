<script setup>
const store = useChatStore();
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
      <img src="/ollama.webp"
           alt="Ollama Logo"
           class="w-60 opacity-5 motion-preset-focus-md motion-delay-300">
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