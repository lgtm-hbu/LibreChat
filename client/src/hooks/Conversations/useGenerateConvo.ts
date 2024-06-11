import { useCallback } from 'react';
import { LocalStorageKeys, isAssistantsEndpoint } from 'librechat-data-provider';
import { useGetModelsQuery, useGetEndpointsQuery } from 'librechat-data-provider/react-query';
import type {
  TPreset,
  TModelsConfig,
  TConversation,
  TEndpointsConfig,
} from 'librechat-data-provider';
import type { AssistantListItem } from '~/common';
import { getEndpointField, buildDefaultConvo, getDefaultEndpoint } from '~/utils';
import useAssistantListMap from '~/hooks/Assistants/useAssistantListMap';

const useGenerateConvo = (index = 0) => {
  const modelsQuery = useGetModelsQuery();
  const assistantsListMap = useAssistantListMap();
  const { data: endpointsConfig = {} as TEndpointsConfig } = useGetEndpointsQuery();

  const generateConversation = useCallback(
    ({
      template = {},
      preset,
      modelsData,
    }: {
      template?: Partial<TConversation>;
      preset?: Partial<TPreset>;
      modelsData?: TModelsConfig;
    } = {}) => {
      let conversation = {
        conversationId: 'new',
        title: 'New Chat',
        endpoint: null,
        ...template,
        createdAt: '',
        updatedAt: '',
      };

      const modelsConfig = modelsData ?? modelsQuery.data;
      const activePreset = preset;

      const defaultEndpoint = getDefaultEndpoint({
        convoSetup: activePreset ?? conversation,
        endpointsConfig,
      });

      const endpointType = getEndpointField(endpointsConfig, defaultEndpoint, 'type');
      if (!conversation.endpointType && endpointType) {
        conversation.endpointType = endpointType;
      } else if (conversation.endpointType && !endpointType) {
        conversation.endpointType = undefined;
      }

      const isAssistantEndpoint = isAssistantsEndpoint(defaultEndpoint);
      const assistants: AssistantListItem[] = assistantsListMap[defaultEndpoint] ?? [];

      if (
        conversation.assistant_id &&
        !assistantsListMap[defaultEndpoint]?.[conversation.assistant_id]
      ) {
        conversation.assistant_id = undefined;
      }

      if (!conversation.assistant_id && isAssistantEndpoint) {
        conversation.assistant_id =
          localStorage.getItem(`${LocalStorageKeys.ASST_ID_PREFIX}${index}${defaultEndpoint}`) ??
          assistants[0]?.id;
      }

      if (
        conversation.assistant_id &&
        isAssistantEndpoint &&
        conversation.conversationId === 'new'
      ) {
        const assistant = assistants.find((asst) => asst.id === conversation.assistant_id);
        conversation.model = assistant?.model;
      }

      if (conversation.assistant_id && !isAssistantEndpoint) {
        conversation.assistant_id = undefined;
      }

      const models = modelsConfig?.[defaultEndpoint] ?? [];
      conversation = buildDefaultConvo({
        conversation,
        lastConversationSetup: activePreset as TConversation,
        endpoint: defaultEndpoint,
        models,
      });

      return conversation;
    },
    [assistantsListMap, endpointsConfig, index, modelsQuery.data],
  );

  return { generateConversation };
};

export default useGenerateConvo;
