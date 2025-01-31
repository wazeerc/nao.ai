<script setup>
const store = useChatStore();
</script>

<template>
  <section class="flex flex-col gap-4 w-full overflow-y-auto pb-2">
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