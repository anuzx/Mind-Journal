import axios from "axios";
import { config } from "../config/config.js";

type AIMetadata = {
  summary: string;
  tags: string[];
};

type GenerateOptions =
  | { text: string; imageUrl?: never }
  | { imageUrl: string; text?: never };

export async function generateSummaryAndTags(
  options: GenerateOptions,
): Promise<AIMetadata> {
  const isImage = !!options.imageUrl;

  const userContent = isImage
    ? [
        {
          type: "image_url",
          image_url: { url: options.imageUrl },
        },
        {
          type: "text",
          text: `Analyze this image. Return a JSON object with exactly two fields:
- "summary": a 2-3 sentence description of what this image contains
- "tags": an array of 5-8 lowercase keyword strings

Return ONLY the JSON object, no markdown, no explanation.`,
        },
      ]
    : `You are a knowledge management assistant. Analyze the following content and return a JSON object with exactly two fields:
- "summary": a 2-3 sentence summary of the content
- "tags": an array of 5-8 lowercase keyword strings that describe the main topics

Return ONLY the JSON object, no markdown, no explanation.

Content:
${options.text}`;

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openrouter/free",
      messages: [{ role: "user", content: userContent }],
      max_tokens: 500,
    },
    {
      headers: {
        Authorization: `Bearer ${config.openrouter_api_key}`,
        "Content-Type": "application/json",
      },
      timeout: 30000,
    },
  );

  const raw = response.data.choices?.[0]?.message?.content;
  if (!raw) throw new Error("Empty response from OpenRouter");

  try {
    const parsed: AIMetadata = JSON.parse(raw.trim());
    if (!parsed.summary || !Array.isArray(parsed.tags)) {
      throw new Error("Invalid shape");
    }
    return parsed;
  } catch {
    throw new Error(`Failed to parse OpenRouter response: ${raw}`);
  }
}