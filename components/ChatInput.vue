<script setup>
const chatInput = ref('');
</script>

<template>
  <div class="flex justify-between gap-4">
    <UInput class="w-[98%]"
            v-model="chatInput"
            placeholder="Say hi to Llama! 🦙" />
    <UButton icon="i-heroicons-paper-airplane"
             size="md"
             color="primary"
             :variant="!chatInput ? 'outline' : 'solid'"
             @click="console.log('Hello!')" />
  </div>
</template>