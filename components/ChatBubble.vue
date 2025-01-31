<script setup lang="ts">
import { cn } from '@utils';

defineProps<{
  message: string;
  isUser: boolean;
}>();
</script>

<template>
  <span :class="cn('text-zinc-200 shadow-xs rounded-xl px-3 py-1 w-fit',
    isUser ? 'bg-slate-900' : 'bg-slate-800')">
    {{ message }}
  </span>
</template>