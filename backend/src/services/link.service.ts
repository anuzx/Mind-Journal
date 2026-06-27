import axios from "axios";
import * as cheerio from "cheerio";
import { URL } from "url";

function isPrivateHostname(hostname: string): boolean {
  if (hostname === "localhost" || hostname === "0.0.0.0") return true;

  const ipv4Match = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const first = parseInt(ipv4Match[1]!, 10);
    const second = parseInt(ipv4Match[2]!, 10);
    if (first === 10) return true;
    if (first === 172 && second >= 16 && second <= 31) return true;
    if (first === 192 && second === 168) return true;
    if (first === 127) return true;
    if (first === 169 && second === 254) return true;
    if (first === 0) return true;
  }

  return false;
}

function validateUrl(urlStr: string): void {
  const parsed = new URL(urlStr);

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Only http and https URLs are allowed");
  }

  if (isPrivateHostname(parsed.hostname)) {
    throw new Error("URL not allowed");
  }
}

export async function extractLink(link: string): Promise<string> {
  validateUrl(link);

  const response = await axios.get(link, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
    },
    timeout: 15000,
  });

  const $ = cheerio.load(response.data);

  $("script, style, nav, footer, header, aside, iframe, noscript").remove();

  const text =
    $("article").text() ||
    $("main").text() ||
    $(".content, .post, .entry").first().text() ||
    $("body").text();

  const cleaned = text.replace(/\s+/g, " ").trim();

  if (!cleaned) throw new Error(`Could not extract content from: ${link}`);

  return cleaned.slice(0, 4000);
}
