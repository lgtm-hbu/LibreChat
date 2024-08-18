require('dotenv').config();
const { z } = require('zod');
const axios = require('axios');
const { Constants } = require('librechat-data-provider');
const { DynamicStructuredTool } = require('langchain/tools');
const { logger } = require('~/config');

async function createEmbedchainTools() {
  const { EMBEDCHAIN_API_BASE_URL = 'http://localhost:8080' } = process.env;
  let apps = [];
  try {
    const response = await axios.get(`${EMBEDCHAIN_API_BASE_URL}/apps`);
    apps = response.data.results;
  } catch (e) {
    logger.error('[createEmbedchainTools] Skipping due to error:', e);
    return [];
  }

  const tools = [];

  for (const app of apps) {
    if (!app.app_id) {
      logger.warn('[createEmbedchainTools] app_id not found for app:', app);
      continue;
    }

    const tool = new DynamicStructuredTool({
      name: `${Constants.CONTEXT_RETRIEVAL_KEY}${app.app_id}`,
      description:
        'Generates a prompt with relevant context from a vector knowledge base to guide you in answering a given query. The context is retrieved using semantic search and is silently used to inform your response. Use multiple times if necessary at once.',
      schema: z.object({
        query: z
          .string()
          .describe(
            'A natural language query to be search the knowledge-base, the output of which to be used to inform your context. The query should be clear, concise, and specific to the information being sought.',
          ),
      }),
      func: async ({ query = '' }) => {
        if (!query) {
          return 'Query was not provided or empty. Please provide a query.';
        }

        const response = await axios.post(`${EMBEDCHAIN_API_BASE_URL}/${app.app_id}/query`, {
          query,
          dry_run: true,
          // citations: true, // if `dry_run` is true, citations will be ignored
        });
        return response.data.response;
      },
    });

    tool.app_id = app.app_id;
    tools.push(tool);
  }

  return tools;
}

function createEmbedchainToolsConfig(tools) {
  return tools.map((tool) => ({
    name: `Retrieval: ${tool.app_id}`,
    pluginKey: tool.name,
    description: `[app_id: ${tool.app_id}] ` + tool.description,
    icon: 'https://ttg-site.b-cdn.net/wp-content/uploads/2020/05/favi.png',
    authConfig: [],
  }));
}

module.exports = {
  createEmbedchainTools,
  createEmbedchainToolsConfig,
};
