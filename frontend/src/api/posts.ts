//delete()
//share()

import axios from "axios";
import { BACKEND_URL, FRONTEND_URL } from "../config";
import type { Content } from "../types/content";

export async function DeletePosts(id: string) {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${BACKEND_URL}/api/v1/user/content`, {
    headers: {
      Authorization: token,
    },
    data: {
      id,
    },
  });

  return response.data; // { message: "Deleted" }
}

export async function fetchContent(): Promise<Content[]> {
  const response = await axios.get(`${BACKEND_URL}/api/v1/user/content`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  return response.data.content;
}

export enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

type ContentPayload = {
  link: string;
  title: string;
  type: ContentType;
  description: string;
};

export async function postContent(data: ContentPayload) {
  await axios.post(`${BACKEND_URL}/api/v1/user/content`, data, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
}

export async function shareMind():Promise<string> {
   const response = await axios.post(
     `${BACKEND_URL}/api/v1/mind/share`,
     {
       share: true,
     },
     {
       headers: {
         Authorization: localStorage.getItem("token"),
       },
     },
   );
   const shareUrl = `${FRONTEND_URL}/api/v1/mind/${response.data.hash}`;
   return shareUrl
}

export async function shareContent(link: string) {
   await navigator.clipboard.writeText(link);
   return link;
}

