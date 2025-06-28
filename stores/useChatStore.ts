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
      const response = await fetchLlamaResponse(text);
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
