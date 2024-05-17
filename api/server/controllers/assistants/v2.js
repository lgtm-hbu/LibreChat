const { validateAndUpdateTool } = require('~/server/services/ActionService');
const { getOpenAIClient } = require('./helpers');
const { logger } = require('~/config');

/**
 * Create an assistant.
 * @route POST /assistants
 * @param {AssistantCreateParams} req.body - The assistant creation parameters.
 * @returns {Assistant} 201 - success response - application/json
 */
const createAssistant = async (req, res) => {
  try {
    /** @type {{ openai: OpenAIClient }} */
    const { openai } = await getOpenAIClient({ req, res });

    const { tools = [], endpoint: _e, ...assistantData } = req.body;
    assistantData.tools = tools
      .map((tool) => {
        if (typeof tool !== 'string') {
          return tool;
        }

        return req.app.locals.availableTools[tool];
      })
      .filter((tool) => tool);

    let azureModelIdentifier = null;
    if (openai.locals?.azureOptions) {
      azureModelIdentifier = assistantData.model;
      assistantData.model = openai.locals.azureOptions.azureOpenAIApiDeploymentName;
    }

    const assistant = await openai.beta.assistants.create(assistantData);
    if (azureModelIdentifier) {
      assistant.model = azureModelIdentifier;
    }
    logger.debug('/assistants/', assistant);
    res.status(201).json(assistant);
  } catch (error) {
    logger.error('[/assistants] Error creating assistant', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Modifies an assistant.
 * @route PATCH /assistants/:id
 * @param {object} req - Express Request
 * @param {object} req.params - Request params
 * @param {string} req.params.id - Assistant identifier.
 * @param {AssistantUpdateParams} req.body - The assistant update parameters.
 * @returns {Assistant} 200 - success response - application/json
 */
const patchAssistant = async (req, res) => {
  try {
    const { openai } = await getOpenAIClient({ req, res });

    const assistant_id = req.params.id;
    const { endpoint: _e, ...updateData } = req.body;
    updateData.tools = updateData.tools ?? [];

    const tools = [];

    for (const tool of updateData.tools ?? []) {
      let actualTool = typeof tool === 'string' ? req.app.locals.availableTools[tool] : tool;

      if (!actualTool) {
        continue;
      }

      if (!actualTool.function) {
        tools.push(actualTool);
        continue;
      }

      const updatedTool = await validateAndUpdateTool({ req, tool: actualTool, assistant_id });
      if (updatedTool) {
        tools.push(updatedTool);
      }
    }

    updateData.tools = tools;

    if (openai.locals?.azureOptions && updateData.model) {
      updateData.model = openai.locals.azureOptions.azureOpenAIApiDeploymentName;
    }

    const updatedAssistant = await openai.beta.assistants.update(assistant_id, updateData);
    res.json(updatedAssistant);
  } catch (error) {
    logger.error('[/assistants/:id] Error updating assistant', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  patchAssistant,
  createAssistant,
};
