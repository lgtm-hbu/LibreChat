import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import type {
  TFileUpload,
  UploadMutationOptions,
  DeleteFilesResponse,
  DeleteFilesBody,
  DeleteMutationOptions,
  UpdatePresetOptions,
  DeletePresetOptions,
  PresetDeleteResponse,
  LogoutOptions,
  TPreset,
  UploadAvatarOptions,
  AvatarUploadResponse,
  Assistant,
  AssistantCreateParams,
  AssistantUpdateParams,
} from 'librechat-data-provider';

import { dataService, MutationKeys, QueryKeys } from 'librechat-data-provider';
import { useSetRecoilState } from 'recoil';
import store from '~/store';

export const useUploadFileMutation = (
  options?: UploadMutationOptions,
): UseMutationResult<
  TFileUpload, // response data
  unknown, // error
  FormData, // request
  unknown // context
> => {
  return useMutation([MutationKeys.fileUpload], {
    mutationFn: (body: FormData) => {
      const height = body.get('height');
      const width = body.get('width');
      if (height && width) {
        return dataService.uploadImage(body);
      }

      return dataService.uploadFile(body);
    },
    ...(options || {}),
  });
};

export const useDeleteFilesMutation = (
  options?: DeleteMutationOptions,
): UseMutationResult<
  DeleteFilesResponse, // response data
  unknown, // error
  DeleteFilesBody, // request
  unknown // context
> => {
  return useMutation([MutationKeys.fileDelete], {
    mutationFn: (body: DeleteFilesBody) => dataService.deleteFiles(body.files),
    ...(options || {}),
  });
};

export const useUpdatePresetMutation = (
  options?: UpdatePresetOptions,
): UseMutationResult<
  TPreset, // response data
  unknown,
  TPreset,
  unknown
> => {
  return useMutation([MutationKeys.updatePreset], {
    mutationFn: (preset: TPreset) => dataService.updatePreset(preset),
    ...(options || {}),
  });
};

export const useDeletePresetMutation = (
  options?: DeletePresetOptions,
): UseMutationResult<
  PresetDeleteResponse, // response data
  unknown,
  TPreset | undefined,
  unknown
> => {
  return useMutation([MutationKeys.deletePreset], {
    mutationFn: (preset: TPreset | undefined) => dataService.deletePreset(preset),
    ...(options || {}),
  });
};

/* login/logout */
export const useLogoutUserMutation = (
  options?: LogoutOptions,
): UseMutationResult<unknown, unknown, undefined, unknown> => {
  const queryClient = useQueryClient();
  const setDefaultPreset = useSetRecoilState(store.defaultPreset);
  return useMutation([MutationKeys.logoutUser], {
    mutationFn: () => dataService.logout(),

    ...(options || {}),
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
    },
    onMutate: (...args) => {
      setDefaultPreset(null);
      queryClient.removeQueries();
      localStorage.removeItem('lastConversationSetup');
      localStorage.removeItem('lastSelectedModel');
      localStorage.removeItem('lastSelectedTools');
      localStorage.removeItem('filesToDelete');
      // localStorage.removeItem('lastAssistant');
      options?.onMutate?.(...args);
    },
  });
};

/* Avatar upload */
export const useUploadAvatarMutation = (
  options?: UploadAvatarOptions,
): UseMutationResult<
  AvatarUploadResponse, // response data
  unknown, // error
  FormData, // request
  unknown // context
> => {
  return useMutation([MutationKeys.avatarUpload], {
    mutationFn: (variables: FormData) => dataService.uploadAvatar(variables),
    ...(options || {}),
  });
};

/**
 * ASSISTANTS
 */

/**
 * Create a new assistant
 */
export const useCreateAssistantMutation = (): UseMutationResult<
  Assistant,
  Error,
  AssistantCreateParams
> => {
  const queryClient = useQueryClient();
  return useMutation(
    (newAssistantData: AssistantCreateParams) => dataService.createAssistant(newAssistantData),
    {
      onSuccess: () => {
        // Invalidate and refetch assistants query to update list
        queryClient.invalidateQueries([QueryKeys.assistants]);
      },
    },
  );
};

/**
 * Hook for updating an assistant
 */
export const useUpdateAssistantMutation = (): UseMutationResult<
  Assistant,
  Error,
  { assistant_id: string; data: AssistantUpdateParams }
> => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ assistant_id, data }: { assistant_id: string; data: AssistantUpdateParams }) =>
      dataService.updateAssistant(assistant_id, data),
    {
      onSuccess: (_, { assistant_id }) => {
        // Invalidate and refetch assistant details query
        queryClient.invalidateQueries([QueryKeys.assistant, assistant_id]);
        // Optionally invalidate and refetch list of assistants
        queryClient.invalidateQueries([QueryKeys.assistants]);
      },
    },
  );
};

/**
 * Hook for deleting an assistant
 */
export const useDeleteAssistantMutation = (): UseMutationResult<
  void,
  Error,
  { assistant_id: string }
> => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ assistant_id }: { assistant_id: string }) => dataService.deleteAssistant(assistant_id),
    {
      onSuccess: () => {
        // Invalidate and refetch assistant list query
        queryClient.invalidateQueries([QueryKeys.assistants]);
      },
    },
  );
};

/**
 * Hook for uploading an assistant avatar
 */
export const useUploadAssistantAvatarMutation = (
  options?: UploadAvatarOptions,
): UseMutationResult<
  AvatarUploadResponse, // response data
  unknown, // error
  FormData, // request
  unknown // context
> => {
  return useMutation([MutationKeys.assistantAvatarUpload], {
    mutationFn: (variables: FormData) => dataService.uploadAssistantAvatar(variables),
    ...(options || {}),
  });
};
