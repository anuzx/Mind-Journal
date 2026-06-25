import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchContent } from "../api/content";

const PAGE_SIZE = 8; 

export function useContent() {
  const query = useInfiniteQuery({
    queryKey: ["content"],
    queryFn: ({ pageParam }) => fetchContent(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const itemsSoFar = lastPage.currentPage * PAGE_SIZE;
      return itemsSoFar < lastPage.totalItems ? lastPage.currentPage + 1 : undefined;
    },
    refetchInterval: 30 * 1000,
    staleTime: 10 * 1000,
  });


  const data = useMemo(
    () => query.data?.pages.flatMap((page) => page.content) ?? [],
    [query.data],
  );

  const totalItems = query.data?.pages[query.data.pages.length - 1]?.totalItems ?? 0;

  return {
    ...query,
    data,
    totalItems,
  };
}