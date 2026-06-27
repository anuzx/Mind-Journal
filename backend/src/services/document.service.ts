import axios from "axios";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import { PermanentError } from "../utils/PermanentError.js";
import { URL } from "url";

function getExtensionFromUrl(url: string): string {
  const cleanUrl = url.split("?")[0] ?? url;
  return cleanUrl.split(".").pop()?.toLowerCase() ?? "";
}

function validateCloudinaryUrl(urlStr: string): void {
  const parsed = new URL(urlStr);
  if (!parsed.hostname.endsWith(".cloudinary.com")) {
    throw new PermanentError("Invalid document URL");
  }
}

export async function extractDocument(cloudinaryUrl: string): Promise<string> {
  validateCloudinaryUrl(cloudinaryUrl);

  const ext = getExtensionFromUrl(cloudinaryUrl);

  if (!["pdf", "docx", "txt"].includes(ext)) {
    throw new PermanentError(`Unsupported file type: .${ext}`);
  }

  const response = await axios.get(cloudinaryUrl, {
    responseType: "arraybuffer",
    timeout: 30000,
  });

  const buffer = Buffer.from(response.data);
  let text = "";

  switch (ext) {
    case "pdf": {
      const parser = new PDFParse({ data: buffer });
      try {
        const result = await parser.getText();
        text = result.text;
      } finally {
        await parser.destroy();
      }
      break;
    }
    case "docx": {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
      break;
    }
    case "txt": {
      text = buffer.toString("utf-8");
      break;
    }
  }

  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) {
    throw new PermanentError(`No text extracted from: ${cloudinaryUrl}`);
  }

  return cleaned.slice(0, 4000);
}
