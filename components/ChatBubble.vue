<script setup lang="ts">
import { cn } from '@utils';
import { marked } from 'marked';

const props = defineProps<{
  message: string;
  isLoading: boolean;
  isUser: boolean;
}>();

const themeStore = useThemeStore();
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
             class="flex items-center gap-2 shadow-xs rounded-xl px-4 py-2 motion-preset-blur-right motion-delay-200 transition-colors duration-300"
             :class="themeStore.isDark ? 'bg-slate-800' : 'bg-slate-200'">
      <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
      <span class="text-sm transition-colors duration-300"
            :class="themeStore.isDark ? 'text-zinc-300' : 'text-slate-700'">
        🦙 Llama is thinking...
      </span>
    </article>

    <div v-else class="flex flex-col group">
      <article :class="cn(
        'shadow-xs rounded-xl px-4 py-2 max-w-full transition-colors duration-300',
        isUser
          ? (themeStore.isDark
            ? 'bg-zinc-800 text-zinc-200 motion-preset-slide-left'
            : 'bg-blue-100 text-slate-800 motion-preset-slide-left')
          : (themeStore.isDark
            ? 'bg-slate-800 text-zinc-200 motion-preset-slide-right prose prose-invert prose-sm'
            : 'bg-slate-200 text-slate-800 motion-preset-slide-right prose prose-slate prose-sm'),
        'prose-p:my-0 prose-ul:my-0 prose-li:my-0 prose-pre:my-0',
        themeStore.isDark ? 'prose-code:text-zinc-200' : 'prose-code:text-slate-700'
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