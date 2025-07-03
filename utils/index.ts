import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}


type LlamaResponse = {
  thoughts: string | undefined;
  response: string;
}
export async function fetchLlamaResponse(input: string, abortController?: AbortController): Promise<LlamaResponse> {
  try {
    const config = useRuntimeConfig();
    const model = config.public.ollamaModel;

    if (!model) {
      console.error('Runtime config:', config.public);
      throw new Error('Ollama model not found in runtime config');
    }

    const response = await fetch("http://localhost:11434/api/generate", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        prompt: input,
        stream: false
      }),
      signal: abortController?.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.response) {
      throw new Error('Invalid response format from API');
    }

    let cleanResponse = data.response.replace(/\\u003c/g, '<').replace(/\\u003e/g, '>');
    const thoughts = cleanResponse.match(/<think>([\s\S]*?)<\/think>/);
    if (thoughts) {
      cleanResponse = cleanResponse.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

      return {
        thoughts: thoughts[1].trim(),
        response: cleanResponse
      } as LlamaResponse;
    }

    return {
      thoughts: undefined,
      response: cleanResponse
    } as LlamaResponse;
  } catch (error) {
    console.error('Error fetching Llama response:', error);
    throw new Error('Failed to get response from Llama API: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}