import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function fetchLlamaResponse(input: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`I am a mock AI assistant. You said: "${input}"`);
    }, 1000);
  });
}