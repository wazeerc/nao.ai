<template>
  <header class="absolute top-3 left-3 hover:motion-preset-stretch hover:motion-delay-100 motion-preset-slide-right motion-delay-800
           inline-flex items-center justify-center
           bg-blue-200/80 dark:bg-slate-800/80
           px-2 py-1
           rounded-full select-none
           border border-blue-900/50 dark:border-blue-100/50">
    <span class="font-semibold text-xs leading-none">beta</span>
  </header>
  <ClientOnly>
    <ThemeToggle />
  </ClientOnly>
  <NaoaiPage />
  <footer class="absolute bottom-3 right-3 text-right text-xs invert opacity-50 font-serif
                 motion-preset-focus motion-delay-800">
    © <a href="https://github.com/wazeerc"
       target="_blank">wazeerc</a> 2025
  </footer>
</template>