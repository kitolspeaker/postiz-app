# Threads media topic compatibility: manual verification

This change is **experimental** until tested against the actual Threads Graph API.
It does not claim that Meta guarantees `topic_tag` plus a caption hashtag for videos.

## Changes

- Send single-image/video container parameters in an `application/x-www-form-urlencoded` POST body rather than a query string.
- Apply the same transport to carousel parent creation, both current pending and legacy paths.
- Preserve caption text and literal ASCII `#` characters in outbound requests; an explicitly selected `topic_tag` is never silently removed.
- Improve user-visible messaging for Meta `code: 2, is_transient: true` failures and `UNKNOWN` processing errors.
- Approximate implicit first-hashtag topics in the local preview; render plain caption text without HTML injection.
- Do not introduce an automatic retry of `threads_publish` because the publish outcome may be uncertain.

## Verify with a disposable/test Threads account

Check the published **topic and caption**, not only whether Postiz shows success.
Use the same MP4 file and account for all tests.

| Post format | Explicit topic | Caption | Expected |
| --- | --- | --- | --- |
| TEXT | CantoVerse | `Testing without hashtag` | Topic CantoVerse |
| TEXT | (empty) | `Testing #TeddyFan` | Topic TeddyFan if Meta extracts it |
| TEXT | CantoVerse | `Testing #TeddyFan` | Topic CantoVerse; literal #TeddyFan remains |
| VIDEO | CantoVerse | `Testing without hashtag` | Topic CantoVerse |
| VIDEO | (empty) | `Testing #TeddyFan` | First hashtag promoted by Meta |
| VIDEO | CantoVerse | `Testing #TeddyFan` | **Primary regression: Meta must accept the combined post** |
| IMAGE | CantoVerse | `Testing #TeddyFan` | Topic CantoVerse, literal hashtag |
| CAROUSEL | CantoVerse | `Testing #TeddyFan` | Topic CantoVerse, literal hashtag |
| VIDEO | CantoVerse | Original JFFT Chinese caption, multiple hashtags | Topic CantoVerse, all literal hashtags preserved |

Also test:
- No topic and no hashtag; Unicode / CJK hashtag; multi-post preview and polls unchanged.
- Poll option above 25 UTF-8 bytes rejected; valid 1–25-byte options accepted.
- Media processing `ERROR` and `UNKNOWN` error strings.
- Verify a Meta `code: 2` publish failure displays the clearer message and does **not** automatically publish again.
- Compare Instagram Standalone preview and publishing to baseline.

If VIDEO + explicit topic + hashtag still fails, **do not merge or deploy**.
The observed issue may be on Meta's API backend; a POST body is only a hypothesis.
Do not automatically strip hashtags or inject zero-width characters.
Retain the known-good Docker image for rollback.
