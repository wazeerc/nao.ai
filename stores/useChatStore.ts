import { fetchLlamaResponse } from '@utils';
import { ref } from 'vue';

interface Message {
  text: string;
  isUser: boolean;
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([]);

  function addMessage(text: string, isUser: boolean) {
    messages.value.push({ text, isUser });
  }

  async function sendMessage(text: string) {
    addMessage(text, true);

    try {
      const response = await fetchLlamaResponse(text);
      addMessage(response, false);
    } catch (error) {
      addMessage('Sorry, I encountered an error. Please ensure OLlama is running and try again.', false);
    }
  }

  function resetChat() {
    messages.value = [];
  }

  return {
    messages,
    sendMessage,
    resetChat
  };
});
