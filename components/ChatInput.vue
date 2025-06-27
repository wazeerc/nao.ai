<script setup>
import { ref } from 'vue';

const store = useChatStore();
const themeStore = useThemeStore();
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
                  base: `resize-none border-1 transition-colors duration-300 ${
                    themeStore.isDark
                      ? 'bg-(--ui-color-neutral-800)/50 border-slate-700'
                      : 'bg-(--ui-color-neutral-100)/50 border-slate-300'
                  }`
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