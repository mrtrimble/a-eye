import { SchemaType } from '@google/generative-ai';

export const generateDiagramSchema = {
  description: 'Generate ASCII Diagram',
  type: SchemaType.OBJECT,
  properties: {
    title: {
      type: SchemaType.STRING,
      description: 'Title of generated diagram',
      nullable: false,
    },
    image: {
      type: SchemaType.STRING,
      description: 'Provide an ASCII art style diagram of the part in the included photo',
      nullable: false,
    },
  },
  required: ['title', 'image'],
};
