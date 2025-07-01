<script setup lang="ts">
import { cn } from '@utils';
import { marked } from 'marked';

const props = defineProps<{
  message: string;
  isLoading: boolean;
  isUser: boolean;
  isThought?: boolean;
}>();

const formattedMessage = computed(() => !props.isUser ? marked(props.message) : props.message);

const hasBeenCopied = ref<boolean>(false);
const copyToClipboard = async () => {
  await navigator.clipboard.writeText(props.message);
  hasBeenCopied.value = true;
  setTimeout(() => {
    hasBeenCopied.value = false;
  }, 1000);
};

const isThoughtExpanded = ref<boolean>(false);
const toggleThought = () => isThoughtExpanded.value = !isThoughtExpanded.value;
</script>

<template>
  <div class="flex flex-col w-fit max-w-full md:max-w-3/5">
    <article v-if="isLoading"
             class="flex items-center gap-2 shadow-xs rounded-xl px-4 py-2 motion-preset-blur-right motion-delay-200 transition-all duration-300 bg-blue-200/50 dark:bg-slate-800/50">
      <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
      <span class="text-sm transition-all duration-300 text-slate-700 dark:text-zinc-300">
        🧠 nao.ai is thinking...
      </span>
    </article>

    <div v-else class="flex flex-col group">
      <div v-if="isThought"
            class="flex items-center gap-2 mb-2 -my-1
                  motion-preset-slide-up motion-delay-300">
        <button @click="toggleThought"
                :aria-expanded="isThoughtExpanded"
                aria-label="Toggle AI reasoning thoughts"
                class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200 cursor-pointer">
          <svg class="w-4 h-4 transition-transform duration-200 text-blue-400/80"
               :class="{ 'rotate-90': isThoughtExpanded }"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span>Thoughts</span>
        </button>
      </div>

      <article v-if="isThought && isThoughtExpanded"
               :class="cn(
                 'border-l-2 border-blue-100 dark:border-blue-100/50',
                 'px-4 py-2 max-w-full transition-all duration-300 mb-2 ml-2',
                 'text-slate-600 dark:text-slate-400 motion-preset-slide-down',
                 'prose prose-slate dark:prose-invert prose-sm',
                 'prose-p:my-0 prose-ul:my-0 prose-li:my-0 prose-pre:my-0',
                 'prose-code:text-slate-600 dark:prose-code:text-slate-400',
                 'italic text-sm'
               )"
               v-html="formattedMessage" />

      <article v-if="!isThought" :class="cn(
        'shadow-xs rounded-xl px-4 py-2 max-w-full transition-all duration-300',
        isUser
          ? 'bg-slate-300 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 motion-preset-slide-left'
          : 'bg-blue-200/75 dark:bg-slate-800 text-slate-800 dark:text-zinc-200 motion-preset-slide-right prose prose-slate dark:prose-invert prose-sm',
        'prose-p:my-0 prose-ul:my-0 prose-li:my-0 prose-pre:my-0',
        'prose-code:text-slate-700 dark:prose-code:text-zinc-200'
      )"
               v-html="formattedMessage" />

      <UButton v-if="!isUser && !isThought && message.length > 0"
               :icon="hasBeenCopied ? 'i-heroicons-check' : 'i-heroicons-clipboard'"
               class="justify-end w-fit ml-auto"
               :class="cn('mt-1 cursor-pointer motion-preset-pop motion-delay-200',
                'group-hover:motion-preset-seesaw-lg')"
               size="xs"
               color="neutral"
               variant="ghost"
               :aria-label="hasBeenCopied ? 'Copied!' : 'Copy message to clipboard'"
               :disabled="hasBeenCopied"
               @click.prevent="copyToClipboard" />
    </div>
  </div>
</template>