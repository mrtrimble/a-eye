import { SchemaType } from '@google/generative-ai';

export const generateDiagramSchema = {
  description: 'Generate Diagram Details',
  type: SchemaType.OBJECT,
  properties: {
    title: {
      type: SchemaType.STRING,
      description: 'Title of generated diagram',
      nullable: false
    },
    image: {
      type: SchemaType.STRING,
      description: 'Generate an ASCII diagram of the object',
      nullable: false
    }
  },
  required: ['title', 'image']
};
