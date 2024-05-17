import { useFormContext, Controller } from 'react-hook-form';
import { Capabilities } from 'librechat-data-provider';
import type { AssistantForm } from '~/common';
import { Checkbox, QuestionMark } from '~/components/ui';
import { useLocalize } from '~/hooks';

export default function Code({ version }: { version: number | string }) {
  const localize = useLocalize();
  const methods = useFormContext<AssistantForm>();
  const { control, setValue, getValues } = methods;

  return (
    <div className="flex items-center">
      <Controller
        name={Capabilities.code_interpreter}
        control={control}
        render={({ field }) => (
          <Checkbox
            {...field}
            checked={field.value}
            onCheckedChange={field.onChange}
            className="relative float-left  mr-2 inline-flex h-4 w-4 cursor-pointer"
            value={field?.value?.toString()}
          />
        )}
      />
      <label
        className="form-check-label text-token-text-primary w-full cursor-pointer"
        htmlFor={Capabilities.code_interpreter}
        onClick={() =>
          setValue(Capabilities.code_interpreter, !getValues(Capabilities.code_interpreter), {
            shouldDirty: true,
          })
        }
      >
        <div className="flex items-center">
          {localize('com_assistants_code_interpreter')}
          <QuestionMark />
        </div>
      </label>
    </div>
  );
}
