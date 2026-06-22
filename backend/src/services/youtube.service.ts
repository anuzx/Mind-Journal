import { Innertube } from "youtubei.js";

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export async function extractYoutube(link: string): Promise<string> {
  const videoId = extractVideoId(link);
  if (!videoId) throw new Error(`Invalid YouTube URL: ${link}`);

  const yt = await Innertube.create({ retrieve_player: false });
  const info = await yt.getInfo(videoId);
  const transcriptData = await info.getTranscript();

  const transcript = transcriptData?.transcript?.content?.body?.initial_segments
    ?.map((seg: any) => seg?.snippet?.text ?? "")
    .join(" ")
    .trim();

  if (!transcript) throw new Error(`No transcript available for: ${link}`);

  // trim to ~4000 chars to stay within token limits
  return transcript.slice(0, 4000);
}