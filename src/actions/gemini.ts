import { defineAction, ActionError } from 'astro:actions';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const key = import.meta.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(key);

const schema = {
  description: 'Part details',
  type: SchemaType.OBJECT,
  properties: {
    name: {
      type: SchemaType.STRING,
      description: 'Name of the part',
      nullable: false
    },
    description: {
      type: SchemaType.STRING,
      description: 'Describe the part, do not mention any people in the photo',
      nullable: false
    },
    dimensions: {
      type: SchemaType.OBJECT,
      properties: {
        height: {
          type: SchemaType.STRING,
          description: "The part's height in inches",
          nullable: false
        },
        width: {
          type: SchemaType.STRING,
          description: "The part's width in inches",
          nullable: false
        },
        depth: {
          type: SchemaType.STRING,
          description: "The part's depth in inches"
        }
      }
    }
  },
  required: ['name', 'description', 'dimensions']
};

const model = genAI.getGenerativeModel({
  model: 'gemini-exp-1114',
  generationConfig: {
    responseMimeType: 'application/json',
    responseSchema: schema
  }
});

export const gemini = {
  getResponse: defineAction({
    handler: async (image) => {
      const promptInstructions = `
        Describe metal part, estimate dimensions, and provide name, follow JSON schema:
      `;

      const { response } = await model.generateContent([promptInstructions, image]);

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
