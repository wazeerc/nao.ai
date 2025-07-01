<script setup>
const colorMode = useColorMode();
const ariaLabel = computed(() => `Switch to ${colorMode.value === 'dark' ? 'light' : 'dark'} mode`);
</script>

<template>
  <div class="absolute top-2 right-2 hover:motion-preset-seesaw">
    <UButton
      :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
      size="lg"
      color="neutral"
      variant="ghost"
      @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
      class="motion-preset-slide-left motion-delay-800 cursor-pointer"
      :aria-label="ariaLabel"
      :ui="{
        base: 'transition-all duration-300'
      }"
    />
  </div>
</template>
