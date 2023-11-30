/**
 * @namespace typedefs
 */

/**
 * @exports OpenAI
 * @typedef {import('openai').OpenAI} OpenAI
 * @memberof typedefs
 */

/**
 * @exports Assistant
 * @typedef {import('librechat-data-provider').Assistant} Assistant
 * @memberof typedefs
 */

/**
 * @exports OpenAIFile
 * @typedef {import('librechat-data-provider').File} OpenAIFile
 * @memberof typedefs
 */

/**
 * @exports TConfig
 * @typedef {import('librechat-data-provider').TConfig} TConfig
 * @memberof typedefs
 */

/**
 * @exports TMessage
 * @typedef {import('librechat-data-provider').TMessage} TMessage
 * @memberof typedefs
 */

/**
 * @exports FileSources
 * @typedef {import('librechat-data-provider').FileSources} FileSources
 * @memberof typedefs
 */

/**
 * @exports ImageMetadata
 * @typedef {Object} ImageMetadata
 * @property {string} file_id - The identifier of the file.
 * @property {string} [temp_file_id] - The temporary identifier of the file.
 * @property {number} width - The width of the image.
 * @property {number} height - The height of the image.
 * @memberof typedefs
 */

/**
 * @exports MongoFile
 * @typedef {import('~/models/schema/fileSchema.js').MongoFile} MongoFile
 * @memberof typedefs
 */

/**
 * @exports AssistantCreateParams
 * @typedef {import('librechat-data-provider').AssistantCreateParams} AssistantCreateParams
 * @memberof typedefs
 */

/**
 * @exports AssistantUpdateParams
 * @typedef {import('librechat-data-provider').AssistantUpdateParams} AssistantUpdateParams
 * @memberof typedefs
 */

/**
 * @exports AssistantListParams
 * @typedef {import('librechat-data-provider').AssistantListParams} AssistantListParams
 * @memberof typedefs
 */

/**
 * @exports AssistantListResponse
 * @typedef {import('librechat-data-provider').AssistantListResponse} AssistantListResponse
 * @memberof typedefs
 */

/**
 * @exports ThreadMessage
 * @typedef {import('openai').OpenAI.Beta.Threads.ThreadMessage} ThreadMessage
 * @memberof typedefs
 */

/**
 * Represents details of the message creation by the run step, including the ID of the created message.
 *
 * @exports MessageCreationStepDetails
 * @typedef {Object} MessageCreationStepDetails
 * @property {Object} message_creation - Details of the message creation.
 * @property {string} message_creation.message_id - The ID of the message that was created by this run step.
 * @property {'message_creation'} type - Always 'message_creation'.
 * @memberof typedefs
 */

/**
 * Details of the Code Interpreter tool call the run step was involved in.
 * Includes the tool call ID, the code interpreter definition, and the type of tool call.
 *
 * @typedef {Object} CodeToolCall
 * @property {string} id - The ID of the tool call.
 * @property {Object} code_interpreter - The Code Interpreter tool call definition.
 * @property {string} code_interpreter.input - The input to the Code Interpreter tool call.
 * @property {Array<Object>} code_interpreter.outputs - The outputs from the Code Interpreter tool call.
 * @property {'code_interpreter'} type - The type of tool call, always 'code_interpreter'.
 * @memberof typedefs
 */

/**
 * Details of a Function tool call the run step was involved in.
 * Includes the tool call ID, the function definition, and the type of tool call.
 *
 * @typedef {Object} FunctionToolCall
 * @property {string} id - The ID of the tool call object.
 * @property {Object} function - The definition of the function that was called.
 * @property {string} function.arguments - The arguments passed to the function.
 * @property {string} function.name - The name of the function.
 * @property {string|null} function.output - The output of the function, null if not submitted.
 * @property {'function'} type - The type of tool call, always 'function'.
 * @memberof typedefs
 */

/**
 * Details of a Retrieval tool call the run step was involved in.
 * Includes the tool call ID and the type of tool call.
 *
 * @typedef {Object} RetrievalToolCall
 * @property {string} id - The ID of the tool call object.
 * @property {unknown} retrieval - An empty object for now.
 * @property {'retrieval'} type - The type of tool call, always 'retrieval'.
 * @memberof typedefs
 */

/**
 * Details of the tool calls involved in a run step.
 * Can be associated with one of three types of tools: `code_interpreter`, `retrieval`, or `function`.
 *
 * @typedef {Object} ToolCallsStepDetails
 * @property {Array<CodeToolCall | RetrievalToolCall | FunctionToolCall>} tool_calls - An array of tool calls the run step was involved in.
 * @property {'tool_calls'} type - Always 'tool_calls'.
 * @memberof typedefs
 */

/**
 * Represents a tool call object required for certain actions in the OpenAI API,
 * including the function definition and type of the tool call.
 *
 * @exports RequiredActionFunctionToolCall
 * @typedef {Object} RequiredActionFunctionToolCall
 * @property {string} id - The ID of the tool call, referenced when submitting tool outputs.
 * @property {Object} function - The function definition associated with the tool call.
 * @property {string} function.arguments - The arguments that the model expects to be passed to the function.
 * @property {string} function.name - The name of the function.
 * @property {'function'} type - The type of tool call the output is required for, currently always 'function'.
 * @memberof typedefs
 */

/**
 * @exports RunManager
 * @typedef {import('./server/services/Runs/RunMananger.js').RunManager} RunManager
 * @memberof typedefs
 */

/**
 * @exports Thread
 * @typedef {Object} Thread
 * @property {string} id - The identifier of the thread.
 * @property {string} object - The object type, always 'thread'.
 * @property {number} created_at - The Unix timestamp (in seconds) for when the thread was created.
 * @property {Object} [metadata] - Optional metadata associated with the thread.
 * @property {Message[]} [messages] - An array of messages associated with the thread.
 * @memberof typedefs
 */

/**
 * @exports Message
 * @typedef {Object} Message
 * @property {string} id - The identifier of the message.
 * @property {string} object - The object type, always 'thread.message'.
 * @property {number} created_at - The Unix timestamp (in seconds) for when the message was created.
 * @property {string} thread_id - The thread ID that this message belongs to.
 * @property {string} role - The entity that produced the message. One of 'user' or 'assistant'.
 * @property {Object[]} content - The content of the message in an array of text and/or images.
 * @property {string} content[].type - The type of content, either 'text' or 'image_file'.
 * @property {Object} [content[].text] - The text content, present if type is 'text'.
 * @property {string} content[].text.value - The data that makes up the text.
 * @property {Object[]} [content[].text.annotations] - Annotations for the text content.
 * @property {Object} [content[].image_file] - The image file content, present if type is 'image_file'.
 * @property {string} content[].image_file.file_id - The File ID of the image in the message content.
 * @property {string[]} [file_ids] - Optional list of File IDs for the message.
 * @property {string|null} [assistant_id] - If applicable, the ID of the assistant that authored this message.
 * @property {string|null} [run_id] - If applicable, the ID of the run associated with the authoring of this message.
 * @property {Object} [metadata] - Optional metadata for the message, a map of key-value pairs.
 * @memberof typedefs
 */

/**
 * @exports UserMessageContent
 * @typedef {Object} UserMessageContent
 * @property {Object[]} content - The content of the message in an array of text and/or images.
 * @property {string} content[].type - The type of content, either 'text' or 'image_file'.
 * @property {Object} [content[].text] - The text content, present if type is 'text'.
 * @property {string} content[].text.value - The data that makes up the text.
 * @property {Object} [content[].image_url] - The image file content, present if type is 'image_file'.
 * @property {string} content[].image_url.url - The File ID of the image in the message content.
 * @property {'auto' | 'low' | 'high'} content[].image_url.detail: 'auto' - the quality to use for the image, either 'auto', 'low', or 'high'.
 * @memberof typedefs
 */

/**
 * Represents a message payload with various potential properties,
 * including roles, sender information, and content.
 *
 * @typedef {Object} PayloadMessage
 * @property {string} [role] - The role of the message sender (e.g., 'user', 'assistant').
 * @property {string} [name] - The name associated with the message.
 * @property {string} [sender] - The sender of the message.
 * @property {string} [text] - The text content of the message.
 * @property {(string|Array<UserMessageContent>)} [content] - The content of the message, which could be a string or an array of the 'content' property from the Message type.
 * @memberof typedefs
 */

/**
 * @exports FunctionTool
 * @typedef {Object} FunctionTool
 * @property {string} type - The type of tool, 'function'.
 * @property {Object} function - The function definition.
 * @property {string} function.description - A description of what the function does.
 * @property {string} function.name - The name of the function to be called.
 * @property {Object} function.parameters - The parameters the function accepts, described as a JSON Schema object.
 * @memberof typedefs
 */

/**
 * @exports Tool
 * @typedef {Object} Tool
 * @property {string} type - The type of tool, can be 'code_interpreter', 'retrieval', or 'function'.
 * @property {FunctionTool} [function] - The function tool, present if type is 'function'.
 * @memberof typedefs
 */

/**
 * @exports Run
 * @typedef {Object} Run
 * @property {string} id - The identifier of the run.
 * @property {string} object - The object type, always 'thread.run'.
 * @property {number} created_at - The Unix timestamp (in seconds) for when the run was created.
 * @property {string} thread_id - The ID of the thread that was executed on as a part of this run.
 * @property {string} assistant_id - The ID of the assistant used for execution of this run.
 * @property {string} status - The status of the run (e.g., 'queued', 'completed').
 * @property {Object} [required_action] - Details on the action required to continue the run.
 * @property {string} required_action.type - The type of required action, always 'submit_tool_outputs'.
 * @property {Object} required_action.submit_tool_outputs - Details on the tool outputs needed for the run to continue.
 * @property {Object[]} required_action.submit_tool_outputs.tool_calls - A list of the relevant tool calls.
 * @property {string} required_action.submit_tool_outputs.tool_calls[].id - The ID of the tool call.
 * @property {string} required_action.submit_tool_outputs.tool_calls[].type - The type of tool call the output is required for, always 'function'.
 * @property {Object} required_action.submit_tool_outputs.tool_calls[].function - The function definition.
 * @property {string} required_action.submit_tool_outputs.tool_calls[].function.name - The name of the function.
 * @property {string} required_action.submit_tool_outputs.tool_calls[].function.arguments - The arguments that the model expects you to pass to the function.
 * @property {Object} [last_error] - The last error associated with this run.
 * @property {string} last_error.code - One of 'server_error' or 'rate_limit_exceeded'.
 * @property {string} last_error.message - A human-readable description of the error.
 * @property {number} [expires_at] - The Unix timestamp (in seconds) for when the run will expire.
 * @property {number} [started_at] - The Unix timestamp (in seconds) for when the run was started.
 * @property {number} [cancelled_at] - The Unix timestamp (in seconds) for when the run was cancelled.
 * @property {number} [failed_at] - The Unix timestamp (in seconds) for when the run failed.
 * @property {number} [completed_at] - The Unix timestamp (in seconds) for when the run was completed.
 * @property {string} [model] - The model that the assistant used for this run.
 * @property {string} [instructions] - The instructions that the assistant used for this run.
 * @property {Tool[]} [tools] - The list of tools used for this run.
 * @property {string[]} [file_ids] - The list of File IDs used for this run.
 * @property {Object} [metadata] - Metadata associated with this run.
 * @memberof typedefs
 */

/**
 * @exports RunStep
 * @typedef {Object} RunStep
 * @property {string} id - The identifier of the run step.
 * @property {string} object - The object type, always 'thread.run.step'.
 * @property {number} created_at - The Unix timestamp (in seconds) for when the run step was created.
 * @property {string} assistant_id - The ID of the assistant associated with the run step.
 * @property {string} thread_id - The ID of the thread that was run.
 * @property {string} run_id - The ID of the run that this run step is a part of.
 * @property {'message_creation' | 'tool_calls'} type - The type of run step.
 * @property {'in_progress' | 'cancelled' | 'failed' | 'completed' | 'expired'} status - The status of the run step.
 * @property {MessageCreationStepDetails | ToolCallsStepDetails} step_details - The details of the run step.
 * @property {Object} [last_error] - The last error associated with this run step.
 * @property {'server_error' | 'rate_limit_exceeded'} last_error.code - One of 'server_error' or 'rate_limit_exceeded'.
 * @property {string} last_error.message - A human-readable description of the error.
 * @property {number} [expired_at] - The Unix timestamp (in seconds) for when the run step expired.
 * @property {number} [cancelled_at] - The Unix timestamp (in seconds) for when the run step was cancelled.
 * @property {number} [failed_at] - The Unix timestamp (in seconds) for when the run step failed.
 * @property {number} [completed_at] - The Unix timestamp (in seconds) for when the run step completed.
 * @property {Object} [metadata] - Metadata associated with this run step, a map of up to 16 key-value pairs.
 * @memberof typedefs
 */

/**
 * @exports StepMessage
 * @typedef {Object} StepMessage
 * @property {Message} message - The complete message object created by the step.
 * @property {string} id - The identifier of the run step.
 * @property {string} object - The object type, always 'thread.run.step'.
 * @property {number} created_at - The Unix timestamp (in seconds) for when the run step was created.
 * @property {string} assistant_id - The ID of the assistant associated with the run step.
 * @property {string} thread_id - The ID of the thread that was run.
 * @property {string} run_id - The ID of the run that this run step is a part of.
 * @property {string} type - The type of run step, either 'message_creation' or 'tool_calls'.
 * @property {string} status - The status of the run step, can be 'in_progress', 'cancelled', 'failed', 'completed', or 'expired'.
 * @property {Object} step_details - The details of the run step.
 * @property {Object} [last_error] - The last error associated with this run step.
 * @property {string} last_error.code - One of 'server_error' or 'rate_limit_exceeded'.
 * @property {string} last_error.message - A human-readable description of the error.
 * @property {number} [expired_at] - The Unix timestamp (in seconds) for when the run step expired.
 * @property {number} [cancelled_at] - The Unix timestamp (in seconds) for when the run step was cancelled.
 * @property {number} [failed_at] - The Unix timestamp (in seconds) for when the run step failed.
 * @property {number} [completed_at] - The Unix timestamp (in seconds) for when the run step completed.
 * @property {Object} [metadata] - Metadata associated with this run step, a map of up to 16 key-value pairs.
 * @memberof typedefs
 */

/**
 * @exports AgentAction
 * @typedef {Object} AgentAction
 * @property {string} tool - The name of the tool used.
 * @property {string} toolInput - The input provided to the tool.
 * @property {string} log - A log or message associated with the action.
 * @memberof typedefs
 */

/**
 * @exports AgentFinish
 * @typedef {Object} AgentFinish
 * @property {Record<string, any>} returnValues - The return values of the agent's execution.
 * @property {string} log - A log or message associated with the finish.
 * @memberof typedefs
 */

/**
 * @exports OpenAIAssistantFinish
 * @typedef {AgentFinish & { run_id: string; thread_id: string; }} OpenAIAssistantFinish
 * @memberof typedefs
 */

/**
 * @exports OpenAIAssistantAction
 * @typedef {AgentAction & { toolCallId: string; run_id: string; thread_id: string; }} OpenAIAssistantAction
 * @memberof typedefs
 */

/**
 * @exports EndpointServiceConfig
 * @typedef {Object} EndpointServiceConfig
 * @property {string} openAIApiKey - The API key for OpenAI.
 * @property {string} azureOpenAIApiKey - The API key for Azure OpenAI.
 * @property {boolean} useAzurePlugins - Flag to indicate if Azure plugins are used.
 * @property {boolean} userProvidedOpenAI - Flag to indicate if OpenAI API key is user provided.
 * @property {string} googleKey - The Palm key.
 * @property {boolean|{userProvide: boolean}} [openAI] - Flag to indicate if OpenAI endpoint is user provided, or its configuration.
 * @property {boolean|{userProvide: boolean}} [assistant] - Flag to indicate if Assistant endpoint is user provided, or its configuration.
 * @property {boolean|{userProvide: boolean}} [azureOpenAI] - Flag to indicate if Azure OpenAI endpoint is user provided, or its configuration.
 * @property {boolean|{userProvide: boolean}} [chatGPTBrowser] - Flag to indicate if ChatGPT Browser endpoint is user provided, or its configuration.
 * @property {boolean|{userProvide: boolean}} [anthropic] - Flag to indicate if Anthropic endpoint is user provided, or its configuration.
 * @property {boolean|{userProvide: boolean}} [bingAI] - Flag to indicate if BingAI endpoint is user provided, or its configuration.
 * @property {boolean|{userProvide: boolean}} [google] - Flag to indicate if BingAI endpoint is user provided, or its configuration.
 * @property {boolean|{userProvide: boolean, userProvideURL: boolean, name: string}} [custom] - Custom Endpoint configuration.
 * @memberof typedefs
 */

/**
 * @exports Plugin
 * @typedef {Object} Plugin
 * @property {string} pluginKey - The key of the plugin.
 * @property {string} name - The name of the plugin.
 * @memberof typedefs
 */

/**
 * @exports GptPlugins
 * @typedef {Object} GptPlugins
 * @property {Plugin[]} plugins - An array of plugins available.
 * @property {string[]} availableAgents - Available agents, 'classic' or 'functions'.
 * @property {boolean} userProvide - A flag indicating if the user has provided the data.
 * @property {boolean} azure - A flag indicating if azure plugins are used.
 * @memberof typedefs
 */

/**
 * @exports DefaultConfig
 * @typedef {Object} DefaultConfig
 * @property {boolean|{userProvide: boolean}} [openAI] - Flag to indicate if OpenAI endpoint is user provided, or its configuration.
 * @property {boolean|{userProvide: boolean}} [assistant] - Flag to indicate if Assistant endpoint is user provided, or its configuration.
 * @property {boolean|{userProvide: boolean}} [azureOpenAI] - Flag to indicate if Azure OpenAI endpoint is user provided, or its configuration.
 * @property {boolean|{userProvide: boolean}} [chatGPTBrowser] - Flag to indicate if ChatGPT Browser endpoint is user provided, or its configuration.
 * @property {boolean|{userProvide: boolean}} [anthropic] - Flag to indicate if Anthropic endpoint is user provided, or its configuration.
 * @property {boolean|{userProvide: boolean}} [bingAI] - Flag to indicate if BingAI endpoint is user provided, or its configuration.
 * @property {boolean|{userProvide: boolean}} [google] - Flag to indicate if Google endpoint is user provided, or its configuration.
 * @property {boolean|{userProvide: boolean, userProvideURL: boolean, name: string}} [custom] - Custom Endpoint configuration.
 * @property {boolean|GptPlugins} [gptPlugins] - Configuration for GPT plugins.
 * @memberof typedefs
 */

/**
 * @exports EndpointConfig
 * @typedef {boolean|TConfig} EndpointConfig
 * @memberof typedefs
 */

/**
 * @exports EndpointWithOrder
 * @typedef {Object} EndpointWithOrder
 * @property {EndpointConfig} config - The configuration of the endpoint.
 * @property {number} order - The order of the endpoint.
 * @memberof typedefs
 */

/**
 * @exports Action
 * @typedef {Object} Action
 * @property {string} tool - The name of the function.
 * @property {Object} toolInput - The args to invoke the function with.
 * @property {string} toolCallId - The ID of the tool call.
 * @property {Run['id']} run_id - Run identifier.
 * @property {Thread['id']} thread_id - Thread identifier.
 * @memberof typedefs
 */

/**
 * @exports StructuredTool
 * @typedef {Object} StructuredTool
 * @property {string} name - The name of the function.
 * @property {string} description - The description of the function.
 * @property {import('zod').ZodTypeAny} schema - The structured zod schema.
 * @memberof typedefs
 */

/**
 * @exports ToolOutput
 * @typedef {Object} ToolOutput
 * @property {string} tool_call_id - The ID of the tool call.
 * @property {Object} output - The output of the tool, which can vary in structure.
 * @memberof typedefs
 */

/**
 * @exports ToolOutputs
 * @typedef {Object} ToolOutputs
 * @property {ToolOutput[]} tool_outputs - Array of tool outputs.
 * @memberof typedefs
 */

/**
 * @typedef {Object} ModelOptions
 * @property {string} modelName - The name of the model.
 * @property {number} [temperature] - The temperature setting for the model.
 * @property {number} [presence_penalty] - The presence penalty setting.
 * @property {number} [frequency_penalty] - The frequency penalty setting.
 * @property {number} [max_tokens] - The maximum number of tokens to generate.
 * @memberof typedefs
 */

/**
 * @typedef {Object} ConfigOptions
 * @property {string} [basePath] - The base path for the API requests.
 * @property {Object} [baseOptions] - Base options for the API requests, including headers.
 * @property {Object} [httpAgent] - The HTTP agent for the request.
 * @property {Object} [httpsAgent] - The HTTPS agent for the request.
 * @memberof typedefs
 */

/**
 * @typedef {Object} Callbacks
 * @property {Function} [handleChatModelStart] - A callback function for handleChatModelStart
 * @property {Function} [handleLLMEnd] - A callback function for handleLLMEnd
 * @property {Function} [handleLLMError] - A callback function for handleLLMError
 * @memberof typedefs
 */

/**
 * @typedef {Object} AzureOptions
 * @property {string} [azureOpenAIApiKey] - The Azure OpenAI API key.
 * @property {string} [azureOpenAIApiInstanceName] - The Azure OpenAI API instance name.
 * @property {string} [azureOpenAIApiDeploymentName] - The Azure OpenAI API deployment name.
 * @property {string} [azureOpenAIApiVersion] - The Azure OpenAI API version.
 * @memberof typedefs
 */

/**
 * @typedef {OpenAI & {
 * req: Express.Request,
 * res: Express.Response
 * mappedOrder: Map<string, number>,
 * seenToolCalls: Map<string, RequiredActionFunctionToolCall>,
 * seenCompletedMessages: Set<string>,
 * getPartialText: () => string,
 * progressCallback: (options: Object) => void,
 * }} OpenAIClient
 */

/**
 * @typedef {Object} Message
 * @property {string} id - The identifier of the message.
 * @property {string} object - The object type, always 'thread.message'.
 * @property {number} created_at - The Unix timestamp (in seconds) for when the message was created.
 * @property {string} thread_id - The thread ID that this message belongs to.
 * @property {string} role - The entity that produced the message. One of 'user' or 'assistant'.
 * @property {Object[]} content - The content of the message in an array of text and/or images.
 * @property {'text'|'image_file'} content[].type - The type of content, either 'text' or 'image_file'.
 * @property {Object} [content[].text] - The text content, present if type is 'text'.
 * @property {string} content[].text.value - The data that makes up the text.
 * @property {Object[]} [content[].text.annotations] - Annotations for the text content.
 * @property {Object} [content[].image_file] - The image file content, present if type is 'image_file'.
 * @property {string} content[].image_file.file_id - The File ID of the image in the message content.
 * @property {string[]} [file_ids] - Optional list of File IDs for the message.
 * @property {string|null} [assistant_id] - If applicable, the ID of the assistant that authored this message.
 * @property {string|null} [run_id] - If applicable, the ID of the run associated with the authoring of this message.
 * @property {Object} [metadata] - Optional metadata for the message, a map of key-value pairs.
 */

/**
 * @typedef {Object} FunctionTool
 * @property {string} type - The type of tool, 'function'.
 * @property {Object} function - The function definition.
 * @property {string} function.description - A description of what the function does.
 * @property {string} function.name - The name of the function to be called.
 * @property {Object} function.parameters - The parameters the function accepts, described as a JSON Schema object.
 */

/**
 * @typedef {Object} Tool
 * @property {string} type - The type of tool, can be 'code_interpreter', 'retrieval', or 'function'.
 * @property {FunctionTool} [function] - The function tool, present if type is 'function'.
 */

/**
 * @typedef {Object} Run
 * @property {string} id - The identifier of the run.
 * @property {string} object - The object type, always 'thread.run'.
 * @property {number} created_at - The Unix timestamp (in seconds) for when the run was created.
 * @property {string} thread_id - The ID of the thread that was executed on as a part of this run.
 * @property {string} assistant_id - The ID of the assistant used for execution of this run.
 * @property {string} status - The status of the run (e.g., 'queued', 'completed').
 * @property {Object} [required_action] - Details on the action required to continue the run.
 * @property {string} required_action.type - The type of required action, always 'submit_tool_outputs'.
 * @property {Object} required_action.submit_tool_outputs - Details on the tool outputs needed for the run to continue.
 * @property {Object[]} required_action.submit_tool_outputs.tool_calls - A list of the relevant tool calls.
 * @property {string} required_action.submit_tool_outputs.tool_calls[].id - The ID of the tool call.
 * @property {string} required_action.submit_tool_outputs.tool_calls[].type - The type of tool call the output is required for, always 'function'.
 * @property {Object} required_action.submit_tool_outputs.tool_calls[].function - The function definition.
 * @property {string} required_action.submit_tool_outputs.tool_calls[].function.name - The name of the function.
 * @property {string} required_action.submit_tool_outputs.tool_calls[].function.arguments - The arguments that the model expects you to pass to the function.
 * @property {Object} [last_error] - The last error associated with this run.
 * @property {string} last_error.code - One of 'server_error' or 'rate_limit_exceeded'.
 * @property {string} last_error.message - A human-readable description of the error.
 * @property {number} [expires_at] - The Unix timestamp (in seconds) for when the run will expire.
 * @property {number} [started_at] - The Unix timestamp (in seconds) for when the run was started.
 * @property {number} [cancelled_at] - The Unix timestamp (in seconds) for when the run was cancelled.
 * @property {number} [failed_at] - The Unix timestamp (in seconds) for when the run failed.
 * @property {number} [completed_at] - The Unix timestamp (in seconds) for when the run was completed.
 * @property {string} [model] - The model that the assistant used for this run.
 * @property {string} [instructions] - The instructions that the assistant used for this run.
 * @property {Tool[]} [tools] - The list of tools used for this run.
 * @property {string[]} [file_ids] - The list of File IDs used for this run.
 * @property {Object} [metadata] - Metadata associated with this run.
 */

/**
 * @typedef {Object} RunStep
 * @property {string} id - The identifier of the run step.
 * @property {string} object - The object type, always 'thread.run.step'.
 * @property {number} created_at - The Unix timestamp (in seconds) for when the run step was created.
 * @property {string} assistant_id - The ID of the assistant associated with the run step.
 * @property {string} thread_id - The ID of the thread that was run.
 * @property {string} run_id - The ID of the run that this run step is a part of.
 * @property {string} type - The type of run step, either 'message_creation' or 'tool_calls'.
 * @property {string} status - The status of the run step, can be 'in_progress', 'cancelled', 'failed', 'completed', or 'expired'.
 * @property {Object} step_details - The details of the run step.
 * @property {Object} [last_error] - The last error associated with this run step.
 * @property {string} last_error.code - One of 'server_error' or 'rate_limit_exceeded'.
 * @property {string} last_error.message - A human-readable description of the error.
 * @property {number} [expired_at] - The Unix timestamp (in seconds) for when the run step expired.
 * @property {number} [cancelled_at] - The Unix timestamp (in seconds) for when the run step was cancelled.
 * @property {number} [failed_at] - The Unix timestamp (in seconds) for when the run step failed.
 * @property {number} [completed_at] - The Unix timestamp (in seconds) for when the run step completed.
 * @property {Object} [metadata] - Metadata associated with this run step, a map of up to 16 key-value pairs.
 */

/**
 * @typedef {Object} StepMessage
 * @property {Message} message - The complete message object created by the step.
 * @property {string} id - The identifier of the run step.
 * @property {string} object - The object type, always 'thread.run.step'.
 * @property {number} created_at - The Unix timestamp (in seconds) for when the run step was created.
 * @property {string} assistant_id - The ID of the assistant associated with the run step.
 * @property {string} thread_id - The ID of the thread that was run.
 * @property {string} run_id - The ID of the run that this run step is a part of.
 * @property {string} type - The type of run step, either 'message_creation' or 'tool_calls'.
 * @property {string} status - The status of the run step, can be 'in_progress', 'cancelled', 'failed', 'completed', or 'expired'.
 * @property {Object} step_details - The details of the run step.
 * @property {Object} [last_error] - The last error associated with this run step.
 * @property {string} last_error.code - One of 'server_error' or 'rate_limit_exceeded'.
 * @property {string} last_error.message - A human-readable description of the error.
 * @property {number} [expired_at] - The Unix timestamp (in seconds) for when the run step expired.
 * @property {number} [cancelled_at] - The Unix timestamp (in seconds) for when the run step was cancelled.
 * @property {number} [failed_at] - The Unix timestamp (in seconds) for when the run step failed.
 * @property {number} [completed_at] - The Unix timestamp (in seconds) for when the run step completed.
 * @property {Object} [metadata] - Metadata associated with this run step, a map of up to 16 key-value pairs.
 */
