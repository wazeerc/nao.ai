<script setup>
const ragStore = useRagStore();
const chatStore = useChatStore();

const chatContainer = ref(null);

watch(() => chatStore.messages, () => {
  nextTick(() => {
    if (chatContainer.value)
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  });
}, { deep: true });
</script>

<template>
  <section
    ref="chatContainer"
    class="flex flex-col gap-4 w-full overflow-y-auto pb-4 rounded"
  >
    <div
      v-if="!chatStore.messages.length && !ragStore.documents.length"
      class="grid place-content-center h-full"
    >
      <div class="flex flex-col items-center text-center">
        <img
          src="/naoai-logo-mono.svg"
          alt="naoai Logo"
          class="w-40 mb-6 motion-preset-focus-lg motion-delay-300 opacity-20 dark:invert dark:opacity-80 transition-all duration-300"
        >
        <p class="font-semibold mt-2 motion-preset-slide-up-md motion-delay-500 transition-all duration-300 text-slate-600 dark:text-slate-500">
          Your Private AI Companion
        </p>
      </div>
    </div>

    <template
      v-for="(message, index) in chatStore.messages"
      :key="index"
    >
      <div
        class="flex flex-col w-full gap-4"
        :class="message.isUser ? 'items-end' : 'items-start'"
      >
        <ChatBubble
          :message="message.text"
          :is-user="message.isUser"
          :is-thought="message.isThought"
          :is-loading="!message.isUser && index === chatStore.messages.length - 1 && chatStore.isLoading"
        />
      </div>
    </template>
  </section>
</template>
