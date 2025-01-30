import { defineAction } from 'astro:actions';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { identificationSchema } from '../scripts/identificationSchema';
import { scanDocumentSchema } from '../scripts/scanDocumentSchema';
import { generateDiagramSchema } from '../scripts/generateDiagramSchema';

const key = import.meta.env.GEMINI_API_KEY;
const useModel = `gemini-1.5-flash`;
const genAI = new GoogleGenerativeAI(key);

const identificationHandler = async (image: string) => {
  const model = genAI.getGenerativeModel({
    model: useModel,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: identificationSchema
    }
  });

  const promptInstructions = `
      Describe part, estimate dimensions, and provide name, follow JSON schema:
    `;

  const { response } = await model.generateContent([promptInstructions, image]);

  if (response) {
    const responseText = response.text();

    return responseText;
  }
};

const scanDocumentHandler = async (image: string) => {
  const model = genAI.getGenerativeModel({
    model: useModel,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: scanDocumentSchema
    }
  });

  const promptInstructions = `
    Scan document and transcribe text, providing document title, follow JSON schema:
  `;

  const { response } = await model.generateContent([promptInstructions, image]);

  if (response) {
    const responseText = response.text();

    return responseText;
  }
};

const generateDiagramHandler = async (image: string) => {
  const model = genAI.getGenerativeModel({
    model: useModel,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: generateDiagramSchema
    }
  });

  const promptInstructions = `
    Generate a 2D line diagram of the object in this photo, follow JSON schema:
  `;

  const { response } = await model.generateContent([promptInstructions, image]);

  if (response) {
    const responseText = response.text();

    return responseText;
  }
};

export const gemini = {
  identifyObject: defineAction({
    handler: async (image) => identificationHandler(image)
  }),
  scanDocument: defineAction({
    handler: async (image) => scanDocumentHandler(image)
  }),
  generateDiagram: defineAction({
    handler: async (image) => generateDiagramHandler(image)
  })
};
