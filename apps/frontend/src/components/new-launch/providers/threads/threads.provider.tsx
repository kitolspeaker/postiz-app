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

const THREADS_POLL_OPTION_BYTE_LIMIT = 25;

const utf8ByteLength = (value: unknown) =>
  new TextEncoder().encode(typeof value === 'string' ? value : '').length;

const PollByteCounter = ({ value }: { value: unknown }) => {
  const byteLength = utf8ByteLength(value);
  const exceedsLimit = byteLength > THREADS_POLL_OPTION_BYTE_LIMIT;

  return (
    <div
      className={`text-xs ${
        exceedsLimit ? 'text-red-500' : 'opacity-60'
      }`}
    >
      {byteLength}/{THREADS_POLL_OPTION_BYTE_LIMIT} UTF-8 bytes
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
      <div className="mb-3 text-xs opacity-70">
        An explicit topic takes priority in the preview. Caption #hashtags
        are preserved. When the field is empty, Threads may use the first
        caption hashtag as the topic.
      </div>

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
              <PollByteCounter value={pollOptionA} />
            </div>

            <div>
              <Input
                label="Poll option 2"
                {...register('poll_option_b')}
              />
              <PollByteCounter value={pollOptionB} />
            </div>

            <div>
              <Input
                label="Poll option 3 (optional)"
                {...register('poll_option_c')}
              />
              <PollByteCounter value={pollOptionC} />
            </div>

            <div>
              <Input
                label="Poll option 4 (optional)"
                {...register('poll_option_d')}
              />
              <PollByteCounter value={pollOptionD} />
            </div>

            <div className="text-sm opacity-70">
              Threads polls are available for text-only posts. The Threads API
              currently limits each poll option to 25 UTF-8 bytes, which can be
              fewer than 25 visible characters for Chinese and emoji text.
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
