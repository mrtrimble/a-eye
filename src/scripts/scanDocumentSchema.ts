import { SchemaType } from '@google/generative-ai';

export const scanDocumentSchema = {
  description: 'Scanned Document Transcription',
  type: SchemaType.OBJECT,
  properties: {
    title: {
      type: SchemaType.STRING,
      description: 'Provide a title of the scanned document',
      nullable: false
    },
    transcription: {
      type: SchemaType.STRING,
      description: 'Provide a text transcription of the scanned document, format in markdown.',
      nullable: false
    }
  },
  required: ['title', 'transcription']
};
