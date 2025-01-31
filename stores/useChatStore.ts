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

    const response = await fetchLlamaResponse(text);
    addMessage(response, false);
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
