export type Content = {
  _id: string;
  title: string;
  description: string;
  link: string;
  type: "twitter" | "youtube" | "document" | "links";
  userId: {
    _id: string;
    username: string;
  };
  createdAt?: string;
  updatedAt?: string;
};
