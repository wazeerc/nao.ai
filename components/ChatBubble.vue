<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<template>
  <span class="bg-zinc-900 text-zinc-200 shadow-xs rounded-4xl px-3 py-1 w-fit">{{ message }}</span>
</template>