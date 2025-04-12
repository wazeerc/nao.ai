<script setup lang="ts">
import { cn } from '@utils';
import { marked } from 'marked';

const props = defineProps<{
  message: string;
  isLoading: boolean;
  isUser: boolean;
}>();

const formattedMessage = computed(() => !props.isUser ? marked(props.message) : props.message);

const hasBeenCopied = ref<boolean>(false);
const copyToClipboard = async () => {
  await navigator.clipboard.writeText(props.message);
  setTimeout(() => {
    hasBeenCopied.value = true;
  }, 200);
};
</script>

<template>
  <div class="flex flex-col w-fit max-w-full">
    <article v-if="isLoading"
             class="flex items-center gap-2 bg-slate-800 shadow-xs rounded-xl px-4 py-2
             motion-preset-blur-right motion-delay-200">
      <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
      <span class="text-zinc-300 text-sm">🦙 Llama is thinking...</span>
    </article>

    <div v-else
         class="flex flex-col group">
      <article :class="cn(
        'text-zinc-200 shadow-xs rounded-xl px-4 py-2 max-w-full',
        isUser ? 'bg-zinc-800 motion-preset-slide-left' : 'bg-slate-800 motion-preset-slide-right prose prose-invert prose-sm',
        'prose-p:my-0 prose-ul:my-0 prose-li:my-0 prose-pre:my-0 prose-code:text-zinc-200'
      )"
               v-html="formattedMessage" />
      <UButton v-if="!isUser && message.length > 1000 && !hasBeenCopied"
               icon="i-heroicons-clipboard"
               class="justify-end w-fit ml-auto"
               :class="cn('mt-1 cursor-pointer motion-preset-pop motion-delay-200',
                'group-hover:motion-preset-seesaw-lg')"
               size="xs"
               color="neutral"
               variant="ghost"
               @click.prevent="copyToClipboard" />
    </div>
  </div>
</template>