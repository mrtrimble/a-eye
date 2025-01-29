import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { GoogleGenerativeAI } from '@google/generative-ai';

const key = import.meta.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({ model: 'gemini-exp-1114' });

export const gemini = {
  getResponse: defineAction({
    accept: 'form',
    input: z.object({
      prompt: z.string()
    }),
    handler: async (input) => {
      const prompt = input.prompt;

      const { response } = await model.generateContent(prompt);

      if (response) {
        const responseText = response.text();

        return responseText;
      } else {
        throw new ActionError({
          code: 'UNPROCESSABLE_CONTENT',
          message: 'Unable to generate a response.'
        });
      }
    }
  })
};
