/**
 * Approximate Threads' display when a caption hashtag becomes the topic.
 * Only affects local preview. Never rewrite the content sent to Meta.
 * If Meta adjusts its hashtag parsing, the posted result may differ.
 */
export function getThreadsTopicPreview(
  content: string,
  configuredTag?: string
): { topicTag?: string; content: string } {
  const explicitTag = configuredTag?.trim();
  if (explicitTag) {
    return { topicTag: explicitTag, content };
  }

  // Match a standalone #word (including Chinese letters) rather than # inside
  // a URL or an email address. Threads owns the definitive parsing rules.
  const match = /(^|[\s([{])#([\p{L}\p{N}_]+)/u.exec(content);
  if (!match) {
    return { topicTag: undefined, content };
  }

  const hashtagStart = match.index + match[1].length;
  const hashtagEnd = hashtagStart + 1 + match[2].length;
  return {
    topicTag: match[2],
    content: content.slice(0, hashtagStart) + content.slice(hashtagEnd),
  };
}
