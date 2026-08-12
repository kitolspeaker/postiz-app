'use client';

import { FC } from 'react';
import { useIntegration } from '@gitroom/frontend/components/launches/helpers/use.integration';
import { useSettings } from '@gitroom/frontend/components/launches/helpers/use.values';
import { useMediaDirectory } from '@gitroom/react/helpers/use.media.directory';
import { stripHtmlValidation } from '@gitroom/helpers/utils/strip.html.validation';
import { ThreadsPostCard } from './threads.post.card';

export const ThreadsPreview: FC<{
  maximumCharacters?: number;
}> = () => {
  const { value, integration } = useIntegration();
  const { watch } = useSettings();
  const mediaDir = useMediaDirectory();

  const topicTag = watch('topic_tag') as string | undefined;

  const pollEnabled = !!watch('poll_enabled');

  const pollOptions = pollEnabled
    ? [
        watch('poll_option_a'),
        watch('poll_option_b'),
        watch('poll_option_c'),
        watch('poll_option_d'),
      ]
        .map((value) =>
          typeof value === 'string' ? value : ''
        )
        .filter((value) => value.trim().length > 0)
    : [];

  return (
    <div className="w-full overflow-hidden rounded-[12px] bg-white">
      {value.map((post, index) => {
        const contentHtml = stripHtmlValidation(
          'normal',
          post.content || '',
          true
        );

        const media = (post.image || []).map((item) => ({
          path: mediaDir.set(item.path),
        }));

        return (
          <ThreadsPostCard
            key={post.id || index}
            name={integration?.name || 'Threads user'}
            picture={integration?.picture}
            contentHtml={contentHtml}
            topicTag={index === 0 ? topicTag : undefined}
            pollOptions={
              index === 0 ? pollOptions : []
            }
            media={media}
            showThreadLine={index < value.length - 1}
          />
        );
      })}
    </div>
  );
};
