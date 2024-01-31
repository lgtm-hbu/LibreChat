import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import type {
  TFile,
  BatchFile,
  TFileUpload,
  AssistantListResponse,
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
  UploadAssistantAvatarOptions,
  AssistantAvatarVariables,
  CreateAssistantMutationOptions,
  UpdateAssistantMutationOptions,
  DeleteAssistantMutationOptions,
  UpdateActionOptions,
  UpdateActionVariables,
  UpdateActionResponse,
  DeleteActionOptions,
  DeleteActionVariables,
  Action,
} from 'librechat-data-provider';

import { dataService, MutationKeys, QueryKeys, defaultOrderQuery } from 'librechat-data-provider';
import { useSetRecoilState } from 'recoil';
import store from '~/store';

export const useUploadFileMutation = (
  _options?: UploadMutationOptions,
): UseMutationResult<
  TFileUpload, // response data
  unknown, // error
  FormData, // request
  unknown // context
> => {
  const queryClient = useQueryClient();
  const { onSuccess, ...options } = _options || {};
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
    onSuccess: (data, formData, context) => {
      queryClient.setQueryData<TFile[] | undefined>([QueryKeys.files], (_files) => [
        data,
        ...(_files ?? []),
      ]);

      const assistant_id = formData.get('assistant_id');

      if (!assistant_id) {
        onSuccess?.(data, formData, context);
        return;
      }

      queryClient.setQueryData<AssistantListResponse>(
        [QueryKeys.assistants, defaultOrderQuery],
        (prev) => {
          if (!prev) {
            return prev;
          }

          return {
            ...prev,
            data: prev?.data.map((assistant) => {
              if (assistant.id === assistant_id) {
                return {
                  ...assistant,
                  file_ids: [...assistant.file_ids, data.file_id],
                };
              }
              return assistant;
            }),
          };
        },
      );
      onSuccess?.(data, formData, context);
    },
  });
};

export const useDeleteFilesMutation = (
  _options?: DeleteMutationOptions,
): UseMutationResult<
  DeleteFilesResponse, // response data
  unknown, // error
  DeleteFilesBody, // request
  unknown // context
> => {
  const queryClient = useQueryClient();
  const { onSuccess, ...options } = _options || {};
  return useMutation([MutationKeys.fileDelete], {
    mutationFn: (body: DeleteFilesBody) => dataService.deleteFiles(body.files, body.assistant_id),
    ...(options || {}),
    onSuccess: (data, ...args) => {
      queryClient.setQueryData<TFile[] | undefined>([QueryKeys.files], (cachefiles) => {
        const { files: filesDeleted } = args[0];

        const fileMap = filesDeleted.reduce((acc, file) => {
          acc.set(file.file_id, file);
          return acc;
        }, new Map<string, BatchFile>());

        return (cachefiles ?? []).filter((file) => !fileMap.has(file.file_id));
      });
      onSuccess?.(data, ...args);
    },
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
export const useCreateAssistantMutation = (
  options?: CreateAssistantMutationOptions,
): UseMutationResult<Assistant, Error, AssistantCreateParams> => {
  const queryClient = useQueryClient();
  return useMutation(
    (newAssistantData: AssistantCreateParams) => dataService.createAssistant(newAssistantData),
    {
      onMutate: (variables) => options?.onMutate?.(variables),
      onError: (error, variables, context) => options?.onError?.(error, variables, context),
      onSuccess: (newAssistant, variables, context) => {
        const listRes = queryClient.getQueryData<AssistantListResponse>([
          QueryKeys.assistants,
          defaultOrderQuery,
        ]);

        if (!listRes) {
          return options?.onSuccess?.(newAssistant, variables, context);
        }

        const currentAssistants = listRes.data;
        currentAssistants.push(newAssistant);

        queryClient.setQueryData<AssistantListResponse>([QueryKeys.assistants, defaultOrderQuery], {
          ...listRes,
          data: currentAssistants,
        });
        return options?.onSuccess?.(newAssistant, variables, context);
      },
    },
  );
};

/**
 * Hook for updating an assistant
 */
export const useUpdateAssistantMutation = (
  options?: UpdateAssistantMutationOptions,
): UseMutationResult<Assistant, Error, { assistant_id: string; data: AssistantUpdateParams }> => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ assistant_id, data }: { assistant_id: string; data: AssistantUpdateParams }) =>
      dataService.updateAssistant(assistant_id, data),
    {
      onMutate: (variables) => options?.onMutate?.(variables),
      onError: (error, variables, context) => options?.onError?.(error, variables, context),
      onSuccess: (updatedAssistant, variables, context) => {
        const listRes = queryClient.getQueryData<AssistantListResponse>([
          QueryKeys.assistants,
          defaultOrderQuery,
        ]);

        if (!listRes) {
          return options?.onSuccess?.(updatedAssistant, variables, context);
        }

        queryClient.setQueryData<AssistantListResponse>([QueryKeys.assistants, defaultOrderQuery], {
          ...listRes,
          data: listRes.data.map((assistant) => {
            if (assistant.id === variables.assistant_id) {
              return updatedAssistant;
            }
            return assistant;
          }),
        });
        return options?.onSuccess?.(updatedAssistant, variables, context);
      },
    },
  );
};

/**
 * Hook for deleting an assistant
 */
export const useDeleteAssistantMutation = (
  options?: DeleteAssistantMutationOptions,
): UseMutationResult<void, Error, { assistant_id: string }> => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ assistant_id }: { assistant_id: string }) => dataService.deleteAssistant(assistant_id),
    {
      onMutate: (variables) => options?.onMutate?.(variables),
      onError: (error, variables, context) => options?.onError?.(error, variables, context),
      onSuccess: (_data, variables, context) => {
        const listRes = queryClient.getQueryData<AssistantListResponse>([
          QueryKeys.assistants,
          defaultOrderQuery,
        ]);

        if (!listRes) {
          return options?.onSuccess?.(_data, variables, context);
        }

        const data = listRes.data.filter((assistant) => assistant.id !== variables.assistant_id);

        queryClient.setQueryData<AssistantListResponse>([QueryKeys.assistants, defaultOrderQuery], {
          ...listRes,
          data,
        });

        return options?.onSuccess?.(_data, variables, data);
      },
    },
  );
};

/**
 * Hook for uploading an assistant avatar
 */
export const useUploadAssistantAvatarMutation = (
  options?: UploadAssistantAvatarOptions,
): UseMutationResult<
  Assistant, // response data
  unknown, // error
  AssistantAvatarVariables, // request
  unknown // context
> => {
  return useMutation([MutationKeys.assistantAvatarUpload], {
    mutationFn: (variables: AssistantAvatarVariables) =>
      dataService.uploadAssistantAvatar(variables),
    ...(options || {}),
  });
};

/**
 * Hook for updating Assistant Actions
 */
export const useUpdateAction = (
  options?: UpdateActionOptions,
): UseMutationResult<
  UpdateActionResponse, // response data
  unknown, // error
  UpdateActionVariables, // request
  unknown // context
> => {
  const queryClient = useQueryClient();
  return useMutation([MutationKeys.updateAction], {
    mutationFn: (variables: UpdateActionVariables) => dataService.updateAction(variables),

    onMutate: (variables) => options?.onMutate?.(variables),
    onError: (error, variables, context) => options?.onError?.(error, variables, context),
    onSuccess: (updateActionResponse, variables, context) => {
      const listRes = queryClient.getQueryData<AssistantListResponse>([
        QueryKeys.assistants,
        defaultOrderQuery,
      ]);

      if (!listRes) {
        return options?.onSuccess?.(updateActionResponse, variables, context);
      }

      const updatedAssistant = updateActionResponse[1];

      queryClient.setQueryData<AssistantListResponse>([QueryKeys.assistants, defaultOrderQuery], {
        ...listRes,
        data: listRes.data.map((assistant) => {
          if (assistant.id === variables.assistant_id) {
            return updatedAssistant;
          }
          return assistant;
        }),
      });

      queryClient.setQueryData<Action[]>([QueryKeys.actions], (prev) => {
        return prev
          ?.map((action) => {
            if (action.action_id === variables.action_id) {
              return updateActionResponse[2];
            }
            return action;
          })
          .concat(variables.action_id ? [] : [updateActionResponse[2]]);
      });

      return options?.onSuccess?.(updateActionResponse, variables, context);
    },
  });
};

/**
 * Hook for deleting an Assistant Action
 */
export const useDeleteAction = (
  options?: DeleteActionOptions,
): UseMutationResult<
  void, // response data for a delete operation is typically void
  Error, // error type
  DeleteActionVariables, // request variables
  unknown // context
> => {
  const queryClient = useQueryClient();
  return useMutation([MutationKeys.deleteAction], {
    mutationFn: (variables: DeleteActionVariables) =>
      dataService.deleteAction(variables.assistant_id, variables.action_id),

    onMutate: (variables) => options?.onMutate?.(variables),
    onError: (error, variables, context) => options?.onError?.(error, variables, context),
    onSuccess: (_data, variables, context) => {
      let domain: string | undefined = '';
      queryClient.setQueryData<Action[]>([QueryKeys.actions], (prev) => {
        return prev?.filter((action) => {
          domain = action.metadata.domain;
          return action.action_id !== variables.action_id;
        });
      });

      queryClient.setQueryData<AssistantListResponse>(
        [QueryKeys.assistants, defaultOrderQuery],
        (prev) => {
          if (!prev) {
            return prev;
          }

          return {
            ...prev,
            data: prev?.data.map((assistant) => {
              if (assistant.id === variables.assistant_id) {
                return {
                  ...assistant,
                  tools: assistant.tools.filter(
                    (tool) => !tool.function?.name.includes(domain ?? ''),
                  ),
                };
              }
              return assistant;
            }),
          };
        },
      );

      return options?.onSuccess?.(_data, variables, context);
    },
  });
};
