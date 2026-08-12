import { VideoOrImage } from '@gitroom/react/helpers/video.or.image';

type ThreadsPostCardProps = {
  name: string;
  picture?: string;
  contentHtml: string;
  topicTag?: string;
  pollOptions?: string[];
  media?: Array<{
    path: string;
  }>;
  showThreadLine?: boolean;
};

const ActionIcons = () => {
  return (
    <div className="flex items-center gap-[18px] pt-[10px] text-black">
      {/* Like */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>

      {/* Reply */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
      </svg>

      {/* Repost */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="m17 1 4 4-4 4" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <path d="m7 23-4-4 4-4" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>

      {/* Share */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    </div>
  );
};

export const ThreadsPostCard = ({
  name,
  picture,
  contentHtml,
  topicTag,
  pollOptions = [],
  media = [],
  showThreadLine = false,
}: ThreadsPostCardProps) => {
  const validPollOptions = pollOptions
    .map((option) => option?.trim())
    .filter(Boolean) as string[];

  return (
    <div className="w-full bg-white text-black px-[16px] py-[14px]">
      <div className="flex gap-[10px]">
        {/* Avatar */}
        <div className="relative flex min-w-[42px] flex-col items-center">
          <img
            src={picture || '/no-picture.jpg'}
            alt={name}
            className="relative z-[2] h-[42px] w-[42px] rounded-full object-cover"
          />

          {showThreadLine && (
            <div className="absolute top-[46px] bottom-[-20px] w-[2px] bg-[#e5e5e5]" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="flex min-w-0 items-center gap-[6px] text-[15px]">
            <span className="truncate font-semibold">{name}</span>

            {!!topicTag?.trim() && (
              <>
                <span className="text-[#777]">›</span>
                <span className="truncate font-semibold">
                  {topicTag.trim()}
                </span>
              </>
            )}
          </div>

          {/* Content */}
          <div
            className="mt-[3px] whitespace-pre-wrap break-words text-[15px] leading-[20px]"
            dangerouslySetInnerHTML={{
              __html: contentHtml,
            }}
          />

          {/* Media */}
          {!!media.length && (
            <div
              className={
                media.length === 1
                  ? 'mt-[12px] overflow-hidden rounded-[12px]'
                  : 'mt-[12px] grid grid-cols-2 gap-[4px] overflow-hidden rounded-[12px]'
              }
            >
              {media.map((item, index) => (
                <div
                  key={`${item.path}_${index}`}
                  className="min-h-[120px] overflow-hidden rounded-[10px]"
                >
                  <VideoOrImage
                    autoplay={true}
                    src={item.path}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Poll */}
          {!!validPollOptions.length && (
            <div className="mt-[14px] flex flex-col gap-[8px]">
              {validPollOptions.map((option, index) => (
                <div
                  key={`${option}_${index}`}
                  className="flex min-h-[46px] items-center justify-between rounded-[13px] border border-[#e1e1e1] px-[12px] text-[15px] font-semibold"
                >
                  <span className="truncate pe-[12px]">
                    {option}
                  </span>

                  <span className="shrink-0 text-[13px] font-normal">
                    0%
                  </span>
                </div>
              ))}

              <div className="pt-[2px] text-[13px] text-[#777]">
                Ends in 24 hours
              </div>
            </div>
          )}

          <ActionIcons />
        </div>
      </div>
    </div>
  );
};
