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
    <template v-for="(message, index) in store.messages"
              :key="index">
      <div class="flex flex-col w-full gap-4"
           :class="message.isUser ? 'items-end' : 'items-start'">
        <ChatBubble :message="message.text"
                    :isUser="message.isUser" />
      </div>
    </template>
  </section>
</template>