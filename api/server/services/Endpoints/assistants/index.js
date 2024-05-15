const addTitle = require('./addTitle');
const buildOptions = require('./buildOptions');
const initializeClient = require('./initializeClient');

/**
 * Asynchronously lists assistants based on provided query parameters.
 *
 * Initializes the client with the current request and response objects and lists assistants
 * according to the query parameters. This function abstracts the logic for non-Azure paths.
 *
 * @async
 * @param {object} params - The parameters object.
 * @param {object} params.req - The request object, used for initializing the client.
 * @param {object} params.res - The response object, used for initializing the client.
 * @param {string} params.version - The API version to use.
 * @param {object} params.query - The query parameters to list assistants (e.g., limit, order).
 * @returns {Promise<object>} A promise that resolves to the response from the `openai.beta.assistants.list` method call.
 */
const listAssistants = async ({ req, res, version, query }) => {
  const { openai } = await initializeClient({ req, res, version });
  return openai.beta.assistants.list(query);
};

module.exports = {
  addTitle,
  buildOptions,
  listAssistants,
  initializeClient,
};
