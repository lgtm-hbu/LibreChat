const { EModelEndpoint } = require('librechat-data-provider');
const { initializeClient, listAssistants } = require('~/server/services/Endpoints/assistants');
const {
  initializeClient: initializeAzureClient,
  listAssistantsForAzure,
} = require('~/server/services/Endpoints/azureAssistants');

// const TESTING = undefined;
const TESTING = 'v1';
/**
 * @param {Express.Request} req
 * @returns {string}
 */
const getCurrentVersion = (req) => {
  if (TESTING) {
    return TESTING;
  }
  return req.baseUrl.slice(-2);
};

const getOpenAIClient = async ({ req, res }) => {
  const version = getCurrentVersion(req);
  const endpoint = req.body.endpoint ?? req.query.endpoint;
  if (!endpoint) {
    throw new Error(`[${req.baseUrl}] Endpoint is required`);
  }

  /** @type {OpenAIClient} */
  let openai;
  if (endpoint === EModelEndpoint.assistants) {
    ({ openai } = await initializeClient({ req, res, version }));
  } else if (endpoint === EModelEndpoint.azureAssistants) {
    ({ openai } = await initializeAzureClient({ req, res, version }));
  }

  return openai;
};

const fetchAssistants = async (req, res) => {
  const version = getCurrentVersion(req);
  const { limit = 100, order = 'desc', after, before, endpoint } = req.query;
  const query = { limit, order, after, before };

  /** @type {AssistantListResponse} */
  let body;

  if (endpoint === EModelEndpoint.assistants) {
    ({ body } = await listAssistants({ req, res, version, query }));
  } else if (endpoint === EModelEndpoint.azureAssistants) {
    const azureConfig = req.app.locals[EModelEndpoint.azureOpenAI];
    body = await listAssistantsForAzure({ req, res, version, azureConfig, query });
  }

  return body;
};

module.exports = {
  getOpenAIClient,
  fetchAssistants,
  getCurrentVersion,
};
