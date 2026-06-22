import axios from "axios";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

function getExtensionFromUrl(url: string): string {
  // Cloudinary URLs: https://res.cloudinary.com/.../upload/v123/filename.pdf
  // strip query params first, then get extension
  const cleanUrl = url.split("?")[0];
  return cleanUrl.split(".").pop()?.toLowerCase() ?? "";
}

export async function extractDocument(cloudinaryUrl: string): Promise<string> {
  const ext = getExtensionFromUrl(cloudinaryUrl);

  if (!["pdf", "docx", "txt"].includes(ext)) {
    throw new Error(`Unsupported file type: .${ext}`);
  }

  // download file as buffer from Cloudinary
  const response = await axios.get(cloudinaryUrl, {
    responseType: "arraybuffer",
    timeout: 30000,
  });

  const buffer = Buffer.from(response.data);
  let text = "";

  switch (ext) {
    case "pdf": {
      const result = await pdfParse(buffer);
      text = result.text;
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
  if (!cleaned) throw new Error(`No text extracted from: ${cloudinaryUrl}`);

  // trim to ~4000 chars to stay within token limits
  return cleaned.slice(0, 4000);
}