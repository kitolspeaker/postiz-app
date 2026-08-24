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
import { ThreadsPreview } from './threads.preview';

const THREADS_POLL_OPTION_CHARACTER_LIMIT = 25;

const unicodeCharacterLength = (value: unknown) =>
  Array.from(typeof value === 'string' ? value : '').length;

const PollCharacterCounter = ({ value }: { value: unknown }) => {
  const length = unicodeCharacterLength(value);
  const exceedsLimit = length > THREADS_POLL_OPTION_CHARACTER_LIMIT;

  return (
    <div
      className={`text-xs ${
        exceedsLimit ? 'text-red-500' : 'opacity-60'
      }`}
    >
      {length}/{THREADS_POLL_OPTION_CHARACTER_LIMIT} characters
      {exceedsLimit ? ' — too long for the Threads API' : ''}
    </div>
  );
};

const SettingsComponent = () => {
  const { register, watch } = useSettings();

  const pollEnabled = watch('poll_enabled');
  const pollOptionA = watch('poll_option_a');
  const pollOptionB = watch('poll_option_b');
  const pollOptionC = watch('poll_option_c');
  const pollOptionD = watch('poll_option_d');

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
            <div>
              <Input
                label="Poll option 1"
                {...register('poll_option_a')}
              />
              <PollCharacterCounter value={pollOptionA} />
            </div>

            <div>
              <Input
                label="Poll option 2"
                {...register('poll_option_b')}
              />
              <PollCharacterCounter value={pollOptionB} />
            </div>

            <div>
              <Input
                label="Poll option 3 (optional)"
                {...register('poll_option_c')}
              />
              <PollCharacterCounter value={pollOptionC} />
            </div>

            <div>
              <Input
                label="Poll option 4 (optional)"
                {...register('poll_option_d')}
              />
              <PollCharacterCounter value={pollOptionD} />
            </div>

            <div className="text-sm opacity-70">
              Threads polls are available for text-only posts. When publishing
              through the Threads API, each poll option can contain up to 25
              characters.
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
  CustomPreviewComponent: ThreadsPreview,
  dto: ThreadsDto,
  maximumCharacters: 500,
});
