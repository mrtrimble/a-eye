import { g as getActionQueryString, A as ActionError } from './index_CaibYeQ-.mjs';
import './astro/server_wd2qmtD1.mjs';
import { d as defineAction, o as objectType, s as stringType } from './server_D0CiTlhR.mjs';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const ENCODED_DOT = "%2E";
function toActionProxy(actionCallback = {}, aggregatedPath = "") {
  return new Proxy(actionCallback, {
    get(target, objKey) {
      if (objKey in target || typeof objKey === "symbol") {
        return target[objKey];
      }
      const path = aggregatedPath + encodeURIComponent(objKey.toString()).replaceAll(".", ENCODED_DOT);
      function action(param) {
        return handleAction(param, path, this);
      }
      Object.assign(action, {
        queryString: getActionQueryString(path),
        toString: () => action.queryString,
        // Progressive enhancement info for React.
        $$FORM_ACTION: function() {
          const searchParams = new URLSearchParams(action.toString());
          return {
            method: "POST",
            // `name` creates a hidden input.
            // It's unused by Astro, but we can't turn this off.
            // At least use a name that won't conflict with a user's formData.
            name: "_astroAction",
            action: "?" + searchParams.toString()
          };
        },
        // Note: `orThrow` does not have progressive enhancement info.
        // If you want to throw exceptions,
        //  you must handle those exceptions with client JS.
        async orThrow(param) {
          const { data, error } = await handleAction(param, path, this);
          if (error) throw error;
          return data;
        }
      });
      return toActionProxy(action, path + ".");
    }
  });
}
async function handleAction(param, path, context) {
  {
    const { getAction } = await import('./server_D0CiTlhR.mjs').then(n => n.b);
    const action = await getAction(path);
    if (!action) throw new Error(`Action not found: ${path}`);
    return action.bind(context)(param);
  }
}
toActionProxy();

const key = "AIzaSyDncK-cp4XjBX57X_5oWdzNxHIMru6PtLI";
const genAI = new GoogleGenerativeAI(key);
const schema = {
  description: "Part details",
  type: SchemaType.OBJECT,
  properties: {
    name: {
      type: SchemaType.STRING,
      description: "Name of the part",
      nullable: false
    },
    description: {
      type: SchemaType.STRING,
      description: "Describe the part, do not mention any people in the photo",
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
  required: ["name", "description", "dimensions"]
};
const model = genAI.getGenerativeModel({
  model: "gemini-exp-1114",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema
  }
});
const gemini = {
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
