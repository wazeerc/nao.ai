import { fetchLlamaResponse } from '@utils';
import { ref } from 'vue';

interface Message {
  query: string;
  isUser: boolean;
  isThought?: boolean;
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([]);
  const isLoading = ref(false);

  function addMessage(query: string, isUser: boolean, isThought = false) {
    messages.value.push({ query, isUser, isThought });
  }

  async function sendMessage(query: string) {
    addMessage(query, true);

    isLoading.value = true;
    addMessage('', false);

    try {
      const response = await fetchLlamaResponse(query);
      messages.value[messages.value.length - 1].query = response.response;
      if (response.thoughts) {
        addMessage(response.thoughts, false, true);
      }

      isLoading.value = false;
    } catch (error) {
      messages.value[messages.value.length - 1].query = 'Sorry, I encountered an error. Please ensure OLlama is running and try again.';
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
