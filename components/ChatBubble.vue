<script setup lang="ts">
import { cn } from '@utils';
import { marked } from 'marked';

const props = defineProps<{
  message: string;
  isLoading: boolean;
  isUser: boolean;
}>();

const formattedMessage = computed(() => {
  return !props.isUser ? marked(props.message) : props.message;
});
</script>

<template>
  <div class="flex flex-col w-fit max-w-full">
    <article v-if="!isLoading"
             :class="cn(
              'text-zinc-200 shadow-xs rounded-xl px-4 py-2 max-w-full',
              isUser ? 'bg-slate-900' : 'bg-slate-800 prose prose-invert prose-sm',
              'prose-p:my-0 prose-ul:my-0 prose-li:my-0 prose-pre:my-0 prose-code:text-zinc-200'
            )"
             v-html="formattedMessage" />

    <article v-else
             class="flex items-center gap-2 bg-slate-800 shadow-xs rounded-xl px-4 py-2">
      <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
      <span class="text-zinc-300 text-sm">🦙 Llama is thinking...</span>
    </article>
  </div>
</template>