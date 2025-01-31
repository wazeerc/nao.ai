<script setup>
import { ref } from 'vue';
const defaultMsg = ref('Hello');
const defaultMsg2 = ref('Hi');
</script>

<template>
  <section class="flex flex-col gap-4 w-full">
    <div class="flex flex-col w-full gap-4 items-end">
      <ChatBubble :message="defaultMsg" />
    </div>
    <div class="flex flex-col w-full gap-4">
      <ChatBubble :message="defaultMsg2" />
    </div>
  </section>
</template>