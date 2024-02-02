const buildOptions = (endpoint, parsedBody, endpointType) => {
  const { chatGptLabel, promptPrefix, systemAlignment, resendImages, imageDetail, ...rest } =
    parsedBody;
  const endpointOption = {
    endpoint,
    endpointType,
    chatGptLabel,
    promptPrefix,
    resendImages,
    systemAlignment,
    imageDetail,
    modelOptions: {
      ...rest,
    },
  };

  return endpointOption;
};

module.exports = buildOptions;
