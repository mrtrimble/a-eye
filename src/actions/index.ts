import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { gemini } from './gemini';

export const server = {
  getGreeting: defineAction({
    input: z.object({
      prompt: z.string()
    }),
    handler: async (input, context) => {
      return `Hello, ${input.prompt}!`;
    }
  }),
  gemini
};
