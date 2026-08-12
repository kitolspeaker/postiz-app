'use client';

import {
  PostComment,
  withProvider,
} from '@gitroom/frontend/components/new-launch/providers/high.order.provider';
import { ThreadFinisher } from '@gitroom/frontend/components/new-launch/finisher/thread.finisher';
import { Input } from '@gitroom/react/form/input';
import { useSettings } from '@gitroom/frontend/components/launches/helpers/use.values';
import { ThreadsDto } from '@gitroom/nestjs-libraries/dtos/posts/providers-settings/threads.dto';

const SettingsComponent = () => {
  const { register } = useSettings();

  return (
    <>
      <Input
        label="Topic tag (Threads)"
        {...register('topic_tag')}
      />

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
