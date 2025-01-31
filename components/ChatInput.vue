<script setup>
import { ref } from 'vue';

const store = useChatStore();
const chatInput = ref('');

const handleNewMessage = () => {
  if (!chatInput.value.trim()) return;
  store.sendMessage(chatInput.value);
  chatInput.value = '';
};
</script>

<template>
  <div class="flex justify-between gap-4">
    <UInput class="w-[98%]"
            v-model="chatInput"
            placeholder="Say hi to Llama! 🦙"
            @keyup.enter="handleNewMessage" />
    <UButton icon="i-heroicons-paper-airplane"
             size="md"
             color="primary"
             :variant="!chatInput ? 'outline' : 'solid'"
             @click="handleNewMessage" />
  </div>
</template>