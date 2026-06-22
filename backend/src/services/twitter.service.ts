import axios from "axios";
import * as cheerio from "cheerio";

export async function extractTwitter(link: string): Promise<string> {
  // Use nitter as a scraping proxy (no API key needed)
  // Replace tweet URL with nitter instance
  const nitterUrl = link
    .replace("https://twitter.com", "https://nitter.net")
    .replace("https://x.com", "https://nitter.net");

  const response = await axios.get(nitterUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
    },
    timeout: 15000,
  });

  const $ = cheerio.load(response.data);

  // nitter tweet text lives in .tweet-content
  const tweetText = $(".tweet-content").first().text().trim();

  if (!tweetText) throw new Error(`Could not extract tweet text from: ${link}`);

  return tweetText;
}