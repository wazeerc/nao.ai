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
             class="flex items-center gap-2 shadow-xs rounded-xl px-4 py-2 motion-preset-blur-right motion-delay-200 transition-all duration-300 bg-slate-200 dark:bg-slate-800">
      <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
      <span class="text-sm transition-all duration-300 text-slate-700 dark:text-zinc-300">
        🦙 Llama is thinking...
      </span>
    </article>

    <div v-else class="flex flex-col group">
      <article :class="cn(
        'shadow-xs rounded-xl px-4 py-2 max-w-full transition-all duration-300',
        isUser
          ? 'bg-blue-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 motion-preset-slide-left'
          : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-zinc-200 motion-preset-slide-right prose prose-slate dark:prose-invert prose-sm',
        'prose-p:my-0 prose-ul:my-0 prose-li:my-0 prose-pre:my-0',
        'prose-code:text-slate-700 dark:prose-code:text-zinc-200'
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