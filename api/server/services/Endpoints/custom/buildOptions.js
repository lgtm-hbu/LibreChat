const buildOptions = (endpoint, parsedBody, endpointType) => {
  const { chatGptLabel, promptPrefix, resendFiles, testSwitch, imageDetail, ...rest } = parsedBody;
  const endpointOption = {
    endpoint,
    endpointType,
    chatGptLabel,
    promptPrefix,
    resendFiles,
    testSwitch,
    imageDetail,
    modelOptions: {
      ...rest,
    },
    // BaseClient.options
    //    BaseClient.options.testSwitch
    // BaseClient.modelOptions
    //    BaseClient.modelOptions.testSwitch
  };

  return endpointOption;
};

module.exports = buildOptions;
