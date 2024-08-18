const path = require('path');
require('module-alias')({ base: path.resolve(__dirname, '..', '..') });
const { createEmbedchainTools } = require('~/server/services/EmbedchainTools');

(async () => {
  // This will test the first fetch result, make sure to add data before testing.
  const tools = await createEmbedchainTools();
  const tool = tools[0];
  const result = await tool._call({ query: 'Who wrote the letter?' });
  console.log(result);
})();
