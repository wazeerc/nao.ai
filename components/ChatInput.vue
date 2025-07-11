<script setup>
import { ref, watch } from "vue";

const chatStore = useChatStore();
const chatInput = ref("");

const fancyPlaceholders = ref([
  "✨ Curious minds ask...",
  "🚀 What would you like to explore?",
  "💡 Share your thoughts or questions...",
  "🔍 Dive deep into any topic...",
  "🌟 Let's discover something amazing...",
  "🧠 Feed your curiosity here...",
]);
const setRandomPlaceholder = () =>
  fancyPlaceholders.value[Math.floor(Math.random() * fancyPlaceholders.value.length)];

const handleNewMessage = () => {
  if (!chatInput.value.trim()) return;
  chatStore.sendMessage(chatInput.value);
  chatInput.value = "";
};

const ragStore = useRagStore();
const document = ref(null);
const documentName = ref(null);

watch(() => ragStore.documents.length, (newLength) => {
  if (newLength === 0) {
    documentName.value = "";
  }
});

const handleDocumentUpload = () => document.value?.click();

const handleDeleteDocument = () => {
  if (documentName.value) {
    ragStore.removeDocument(documentName.value);
    documentName.value = null;
  }
};

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    if (file.type === "application/pdf" || file.type === "text/plain") {
      ragStore.addDocument(file);
      documentName.value = file.name;

      await ragStore.processDocuments([file]);
    }
    else {
      ragStore.error = `'${file.type}' is not supported yet.`;
    }

    event.target.value = "";
  }
  catch (error) {
    console.error("Error reading file:", error);
  }
};
</script>

<template>
  <div>
    <div
      v-if="ragStore.error"
      class="bg-amber-100 text-slate-700 text-sm mb-2 p-1 px-2 rounded-lg shadow-xs w-fit motion-preset-slide-up"
    >
      {{ ragStore.error }}
    </div>
    <div
      v-show="documentName && !ragStore.error"
      class="flex flex-row items-center mb-2 gap-1 motion-preset-slide-up"
    >
      <div class="bg-slate-200/75 dark:bg-slate-800/50 p-1 rounded-lg shadow-xs w-fit">
        <div class="flex items-center gap-2">
          <p class="px-1 text-slate-600 dark:text-slate-400 truncate max-w-80 text-sm">
            {{ documentName }}
          </p>
          <div
            v-if="ragStore.isProcessing"
            class="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"
          >
            <span class="sr-only">Processing document</span>
          </div>
          <div
            v-else-if="ragStore.processedDocuments.includes(documentName)"
            class="text-green-500 text-sm pr-1"
          >
            📑
            <span class="sr-only">Document processed</span>
          </div>
        </div>
      </div>
      <UButton
        v-if="!ragStore.isProcessing"
        :disabled="chatStore.isLoading || ragStore.isProcessing"
        icon="i-heroicons-trash"
        size="sm"
        color="neutral"
        variant="ghost"
        class="text-red-400 cursor-pointer motion-preset-slide-left"
        aria-label="Delete document"
        title="Delete document"
        @click="handleDeleteDocument"
      />
    </div>
    <div
      class="flex justify-between items-center gap-4 max-h-54 motion-preset-slide-up-lg motion-delay-500"
    >
      <label
        for="chat-input"
        class="sr-only"
      >Chat input</label>
      <UTextarea
        id="chat-input"
        v-model="chatInput"
        class="w-full"
        autoresize
        autofocus
        :rows="1"
        :maxrows="10"
        color="primary"
        variant="subtle"
        :placeholder="setRandomPlaceholder()"
        :disabled="chatStore.isLoading || ragStore.isProcessing"
        :ui="{
          base: 'resize-none transition-all duration-300 bg-(--ui-color-neutral-100)/50 dark:bg-(--ui-color-neutral-800)/50 border-slate-300 dark:border-slate-700',
        }"
        @keydown="(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleNewMessage();
          }
        }"
      />
      <div class="flex items-center gap-2">
        <input
          ref="document"
          type="file"
          accept=".txt,.pdf"
          class="hidden"
          @change="handleFileChange"
        >
        <UButton
          icon="i-heroicons-paper-clip"
          class="cursor-pointer"
          size="md"
          color="neutral"
          variant="subtle"
          aria-label="Upload a .txt or .pdf file"
          title="Upload .txt or .pdf file"
          :disabled="ragStore.isProcessing || chatStore.isLoading"
          @click="handleDocumentUpload"
        />
        <UButton
          icon="i-heroicons-paper-airplane"
          class="cursor-pointer"
          size="md"
          color="secondary"
          variant="solid"
          aria-label="Send message"
          :disabled="!chatInput || ragStore.isProcessing || chatStore.isLoading"
          @click="handleNewMessage"
        />
      </div>
    </div>
  </div>
</template>
