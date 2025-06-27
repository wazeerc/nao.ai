<script setup>
const themeStore = useThemeStore();
</script>

<template>
  <div class="absolute top-2 right-2 hover:motion-preset-seesaw">
    <UButton
      :icon="themeStore.isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
      size="lg"
      color="neutral"
      variant="ghost"
      @click="themeStore.toggleTheme"
      class="motion-preset-slide-left motion-delay-800"
      :ui="{
        base: 'transition-all duration-300'
      }"
    />
  </div>
</template>
