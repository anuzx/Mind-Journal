//delete()
//share()

import axios from "axios";
import { BACKEND_URL } from "../config";
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
