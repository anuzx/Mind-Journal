import { useQuery } from "@tanstack/react-query";
import { fetchContent } from "../api/posts";
import type{ Content } from "../types/content";

export function useContent() {
  return useQuery<Content[]>({
    queryKey: ["content"],
    queryFn: fetchContent,
    refetchInterval: 10 * 1000, // replaces setInterval
    staleTime: 5 * 1000,
  });
}
//when you first load dashboard :
/*
TanStack Query does this:

Calls fetchContent()

Stores result in cache under key:
["content"]

Components subscribe to that cache
*/