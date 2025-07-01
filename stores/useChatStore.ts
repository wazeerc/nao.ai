import { fetchLlamaResponse } from '@utils';
import { ref } from 'vue';

interface Message {
  text: string;
  isUser: boolean;
  isThought?: boolean;
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([]);
  const isLoading = ref(false);

  function addMessage(text: string, isUser: boolean, isThought = false) {
    messages.value.push({ text, isUser, isThought });
  }

  async function sendMessage(text: string) {
    addMessage(text, true);

    isLoading.value = true;
    addMessage('', false);

    try {
      const ragStore = useRagStore();
      let contextualPrompt = text;

      if (ragStore.processedDocuments.length > 0 && ragStore.ragInstance) {
        try {
          const ragResponse = await ragStore.queryRAG(text);

          if (ragResponse && ragResponse.answer) {
            contextualPrompt = `Context from uploaded documents: ${ragResponse.answer}
            User question: ${text}
            Please answer the user's question using the provided context when relevant.`;
          }
        } catch (ragError) {
          console.warn('RAG query failed, proceeding with normal chat:', ragError);
        }
      }

      const response = await fetchLlamaResponse(contextualPrompt);
      messages.value[messages.value.length - 1].text = response.response;
      if (response.thoughts) {
        addMessage(response.thoughts, false, true);
      }

      isLoading.value = false;
    } catch (error) {
      messages.value[messages.value.length - 1].text = 'Sorry, I encountered an error. Please ensure OLlama is running and try again.';
      isLoading.value = false;
    }
  }

  function resetChat() {
    messages.value = [];
    isLoading.value = false;
  }

  return {
    messages,
    isLoading,
    sendMessage,
    resetChat
  };
});
