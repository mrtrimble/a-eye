import { SchemaType } from '@google/generative-ai';

export const identificationSchema = {
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