import { useMemo } from 'react';
import useGenerateConvo from '~/hooks/Conversations/useGenerateConvo';
import useAddedHelpers from '~/hooks/Chat/useAddedHelpers';

export default function useAddedResponse({ rootIndex }: { rootIndex: number }) {
  const currentIndex = useMemo(() => rootIndex + 1, [rootIndex]);
  const { ask, regenerate, conversation, setConversation } = useAddedHelpers({
    rootIndex,
    currentIndex,
  });
  const { generateConversation } = useGenerateConvo({ index: currentIndex, setConversation });
  return { ask, regenerate, conversation, setConversation, generateConversation };
}
