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
  <div
       class="flex justify-between items-center gap-4 max-h-54 motion-preset-slide-up-lg motion-delay-500">
    <div class="w-full">
      <UTextarea class="w-full"
                 autoresize
                 autofocus
                 :rows="1"
                 :maxrows="10"
                 color="primary"
                 variant="subtle"
                 v-model="chatInput"
                 placeholder="✨ Curious minds ask..."
                 @keydown="(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleNewMessage();
                  }
                }"
                 :ui="{
                  base: 'resize-none border-1 transition-all duration-300 bg-(--ui-color-neutral-100)/50 dark:bg-(--ui-color-neutral-800)/50 border-slate-300 dark:border-slate-700'
                }" />
    </div>
    <div class="flex items-center">
      <UButton icon="i-heroicons-paper-airplane"
               size="md"
               color="secondary"
               variant="solid"
               :disabled="!chatInput"
               @click="handleNewMessage" />
    </div>
  </div>
</template>