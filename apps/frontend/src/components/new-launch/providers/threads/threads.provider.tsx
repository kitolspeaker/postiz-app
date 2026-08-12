'use client';

import {
  PostComment,
  withProvider,
} from '@gitroom/frontend/components/new-launch/providers/high.order.provider';
import { ThreadFinisher } from '@gitroom/frontend/components/new-launch/finisher/thread.finisher';
import { Input } from '@gitroom/react/form/input';
import { Checkbox } from '@gitroom/react/form/checkbox';
import { useSettings } from '@gitroom/frontend/components/launches/helpers/use.values';
import { ThreadsDto } from '@gitroom/nestjs-libraries/dtos/posts/providers-settings/threads.dto';

const SettingsComponent = () => {
  const { register, watch } = useSettings();

  const pollEnabled = watch('poll_enabled');

  return (
    <>
      <Input
        label="Topic tag (Threads)"
        {...register('topic_tag')}
      />

      <div className="mt-5 flex flex-col gap-[10px] border-tableBorder border p-[15px] rounded-lg mb-5">
        <Checkbox
          label="Add a poll"
          {...register('poll_enabled')}
        />

        {pollEnabled && (
          <div className="flex flex-col gap-[10px]">
            <Input
              label="Poll option 1"
              {...register('poll_option_a')}
            />

            <Input
              label="Poll option 2"
              {...register('poll_option_b')}
            />

            <Input
              label="Poll option 3 (optional)"
              {...register('poll_option_c')}
            />

            <Input
              label="Poll option 4 (optional)"
              {...register('poll_option_d')}
            />

            <div className="text-sm opacity-70">
              Threads polls are available for text-only posts.
            </div>
          </div>
        )}
      </div>

      <ThreadFinisher />
    </>
  );
};

export default withProvider({
  postComment: PostComment.POST,
  minimumCharacters: [],
  SettingsComponent: SettingsComponent,
  CustomPreviewComponent: undefined,
  dto: ThreadsDto,
  maximumCharacters: 500,
});
