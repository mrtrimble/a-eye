import './_astro_actions_DexXI5qq.mjs';
import { d as defineAction, o as objectType, s as stringType } from './server_BUDoka-g.mjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { A as ActionError } from './index_40a397_I.mjs';

const key = "AIzaSyDncK-cp4XjBX57X_5oWdzNxHIMru6PtLI";
const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const gemini = {
  getResponse: defineAction({
    accept: "form",
    input: objectType({
      prompt: stringType()
    }),
    handler: async (input) => {
      const prompt = input.prompt;
      const { response } = await model.generateContent(prompt);
      if (response) {
        const responseText = response.text();
        console.log(responseText);
        return responseText;
      } else {
        throw new ActionError({
          code: "UNPROCESSABLE_CONTENT",
          message: "Unable to generate a response."
        });
      }
    }
  })
};

const server = {
  getGreeting: defineAction({
    input: objectType({
      prompt: stringType()
    }),
    handler: async (input, context) => {
      return `Hello, ${input.prompt}!`;
    }
  }),
  gemini
};

export { server };
