import { SchemaType } from '@google/generative-ai';

export const identificationSchema = {
  description: 'Part Identification',
  type: SchemaType.OBJECT,
  properties: {
    name: {
      type: SchemaType.STRING,
      description: 'Provide the name of the part in the included photo',
      nullable: false,
    },
    description: {
      type: SchemaType.STRING,
      description: 'Provide a short description of the part in the included photo',
      nullable: false,
    },
    dimensions: {
      type: SchemaType.OBJECT,
      properties: {
        height: {
          type: SchemaType.STRING,
          description: "Provide the part's height in inches",
          nullable: false,
        },
        width: {
          type: SchemaType.STRING,
          description: "Provide the part's width in inches",
          nullable: false,
        },
        depth: {
          type: SchemaType.STRING,
          description: "Provide the part's depth in inches",
        },
      },
    },
    color: {
      type: SchemaType.STRING,
      description: "Provide the part's color in hexadecimal",
    },
    materials: {
      type: SchemaType.ARRAY,
      description: "Provide a list of part materials",
      items: {
        type: SchemaType.STRING
      }
    }
  },
  required: ['name', 'description', 'dimensions', 'color', 'materials'],
};