import { SchemaType } from '@google/generative-ai';

export const scanDocumentSchema = {
  description: 'Document Transcription Details',
  type: SchemaType.OBJECT,
  properties: {
    title: {
      type: SchemaType.STRING,
      description: 'Set the title of the document',
      nullable: false
    },
    transcription: {
      type: SchemaType.STRING,
      description: 'Scan document and transcribe text to markdown',
      nullable: false
    }
  },
  required: ['title', 'transcription']
};
