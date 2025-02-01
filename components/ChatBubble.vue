<script setup lang="ts">
import { cn } from '@utils';
import { marked } from 'marked';

const props = defineProps<{
  message: string;
  isUser: boolean;
}>();

const formattedMessage = computed(() => {
  return !props.isUser ? marked(props.message) : props.message;
});
</script>

<template>
  <article :class="cn('text-zinc-200 shadow-xs rounded-xl px-4 py-2 w-fit max-w-full',
    isUser ? 'bg-slate-900' : 'bg-slate-800 prose prose-invert prose-sm',
    'prose-p:my-0 prose-ul:my-0 prose-li:my-0 prose-pre:my-0 prose-code:text-zinc-200')"
           v-html="formattedMessage">
  </article>
</template>