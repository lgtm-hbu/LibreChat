import React, { useMemo, memo } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { removeNullishValues } from 'librechat-data-provider';
import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react/unstyled';
import type { SandpackPreviewRef } from '@codesandbox/sandpack-react/unstyled';
import type { Artifact } from '~/common';
import {
  sharedFiles,
  sharedProps,
  getTemplate,
  sharedOptions,
  getArtifactFilename,
} from '~/utils/artifacts';

export const ArtifactPreview = memo(function ({
  showEditor = false,
  artifact,
  previewRef,
}: {
  showEditor?: boolean;
  artifact: Artifact;
  previewRef: React.MutableRefObject<SandpackPreviewRef>;
}) {
  const files = useMemo(() => {
    return removeNullishValues({ [getArtifactFilename(artifact.type ?? '')]: artifact.content });
  }, [artifact.type, artifact.content]);

  const template = useMemo(
    () => getTemplate(artifact.type ?? '', artifact.language),
    [artifact.type, artifact.language],
  );

  if (Object.keys(files).length === 0) {
    return null;
  }

  return showEditor ? (
    <Sandpack
      options={{
        showNavigator: true,
        editorHeight: '80vh',
        showTabs: true,
        ...sharedOptions,
      }}
      files={{
        ...files,
        ...sharedFiles,
      }}
      {...sharedProps}
      template={template}
    />
  ) : (
    <SandpackProvider
      files={{
        ...files,
        ...sharedFiles,
      }}
      options={{ ...sharedOptions }}
      {...sharedProps}
      template={template}
    >
      <SandpackPreview
        showOpenInCodeSandbox={false}
        showRefreshButton={false}
        tabIndex={0}
        ref={previewRef}
      />
    </SandpackProvider>
  );
});
