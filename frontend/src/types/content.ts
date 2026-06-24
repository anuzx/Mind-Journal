export type Content = {
  _id: string;
  title: string;
  description: string;
  link?: string;
  type: "twitter" | "youtube" | "document" | "link" | "note" | "image";
  aiTags: string[];
  aiSummary: string;
  metadataStatus: "pending" | "processing" | "completed" | "failed";
  isCompleted?: boolean;
  dueDate?: string;
  cloudinaryUrl?: string;
  publicId?: string;
  resourceType?: "image" | "raw";
  userId: {
    _id: string;
    username: string;
  };
  createdAt?: string;
  updatedAt?: string;
};
