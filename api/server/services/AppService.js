const { FileSources } = require('librechat-data-provider');
const { initializeFirebase } = require('./Files/Firebase/initialize');
const loadCustomConfig = require('./Config/loadCustomConfig');
const { loadAndFormatTools } = require('./ToolService');
const paths = require('~/config/paths');

/**
 *
 * Loads custom config and initializes app-wide variables.
 * @function AppService
 * @param {Express.Application} app - The Express application object.
 */
const AppService = async (app) => {
  const config = (await loadCustomConfig()) ?? {};
  const fileStrategy = config.fileStrategy ?? FileSources.local;
  process.env.CDN_PROVIDER = fileStrategy;

  if (fileStrategy === FileSources.firebase) {
    initializeFirebase();
  }

  const availableTools = loadAndFormatTools({
    directory: paths.structuredTools,
    filter: new Set([
      'ChatTool.js',
      'CodeSherpa.js',
      'CodeSherpaTools.js',
      'E2BTools.js',
      'extractionChain.js',
    ]),
  });

  /** @type {Record<string, FunctionTool} */

  app.locals = {
    availableTools,
    fileStrategy,
    paths,
  };
};

module.exports = AppService;
