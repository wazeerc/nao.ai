import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export async function fetchLlamaResponse(input: string): Promise<string> {
  try {
    const config = useRuntimeConfig();
    const model = config.public.llamaModel;

    if (!model) {
      console.error('Runtime config:', config.public);
      throw new Error('Llama model not found in runtime config');
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
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.response) {
      throw new Error('Invalid response format from API');
    }

    return data.response;
  } catch (error) {
    console.error('Error fetching Llama response:', error);
    throw new Error('Failed to get response from Llama API: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}