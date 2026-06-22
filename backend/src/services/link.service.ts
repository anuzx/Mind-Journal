import axios from "axios";
import * as cheerio from "cheerio";

export async function extractLink(link: string): Promise<string> {
  const response = await axios.get(link, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
    },
    timeout: 15000,
  });

  const $ = cheerio.load(response.data);

  // remove noise
  $("script, style, nav, footer, header, aside, iframe, noscript").remove();

  // prefer article/main content, fall back to body
  const text =
    $("article").text() ||
    $("main").text() ||
    $(".content, .post, .entry").first().text() ||
    $("body").text();

  const cleaned = text.replace(/\s+/g, " ").trim();

  if (!cleaned) throw new Error(`Could not extract content from: ${link}`);

  // trim to ~4000 chars to stay within token limits
  return cleaned.slice(0, 4000);
}