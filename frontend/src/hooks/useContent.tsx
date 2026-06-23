import { useQuery } from "@tanstack/react-query";
import { fetchContent } from "../api/content";
import type { Content } from "../types/content";

export function useContent() {
  return useQuery<Content[]>({
    queryKey: ["content"],
    queryFn: fetchContent,
    refetchInterval: 30 * 1000,
    staleTime: 10 * 1000,
  });
}
