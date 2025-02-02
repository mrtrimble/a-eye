import { defineAction } from 'astro:actions';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { identificationSchema } from '../scripts/identificationSchema';
import { scanDocumentSchema } from '../scripts/scanDocumentSchema';
import { generateDiagramSchema } from '../scripts/generateDiagramSchema';

const key = import.meta.env.GEMINI_API_KEY;
const useModel = import.meta.env.GEMINI_MODEL;
const genAI = new GoogleGenerativeAI(key);

const identificationHandler = async (image: string) => {
  const model = genAI.getGenerativeModel({
    model: useModel,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: identificationSchema,
    },
  });

  const promptInstructions = `
    Examine the part in this photo. 
    
    Provide a name and description of the part. Also provide the dimensions: height, width, and depth in inches. 
    
    Follow the provided JSON schema.
  `;

  const { response } = await model.generateContent([promptInstructions, image]);

  if (response) {
    const responseText = response.text();
    console.log({ responseText });

    return responseText;
  }
};

const scanDocumentHandler = async (image: string) => {
  const model = genAI.getGenerativeModel({
    model: useModel,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: scanDocumentSchema,
    },
  });

  const promptInstructions = `
    Examine the document in this photo. 
    
    Provide a document title and a text transcription of the document.
    
    Follow the provided JSON schema.
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
      responseSchema: generateDiagramSchema,
    },
  });

  const promptInstructions = `
    Examine the part in this photo. 
    
    Generate an ASCII-art style diagram of the part in the photo. 
    
    Follow the provided JSON schema.
  `;

  const { response } = await model.generateContent([promptInstructions, image]);

  if (response) {
    const responseText = response.text();

    return responseText;
  }
};

export const gemini = {
  identifyObject: defineAction({
    handler: async (image) => identificationHandler(image),
  }),
  scanDocument: defineAction({
    handler: async (image) => scanDocumentHandler(image),
  }),
  generateDiagram: defineAction({
    handler: async (image) => generateDiagramHandler(image),
  }),
};
