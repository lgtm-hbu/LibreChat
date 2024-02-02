const buildOptions = (endpoint, parsedBody) => {
  const { chatGptLabel, promptPrefix, resendImages, systemAlignment, imageDetail, ...rest } =
    parsedBody;
  const endpointOption = {
    endpoint,
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
