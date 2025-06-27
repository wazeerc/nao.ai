import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true);

  function toggleTheme() {
    isDark.value = !isDark.value;
    updateDocumentClass();
  }

  function setTheme(dark: boolean) {
    isDark.value = dark;
    updateDocumentClass();
  }

  function updateDocumentClass() {
    if (import.meta.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    }
  }

  function initializeTheme() {
    if (import.meta.client) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        isDark.value = savedTheme === 'dark';
      } else {
        isDark.value = true;
        localStorage.setItem('theme', 'dark');
      }
      updateDocumentClass();
    }
  }

  watch(isDark, (newValue) => {
    if (import.meta.client) {
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
    }
  });

  initializeTheme();

  return {
    isDark,
    toggleTheme,
    setTheme,
    initializeTheme
  };
});
