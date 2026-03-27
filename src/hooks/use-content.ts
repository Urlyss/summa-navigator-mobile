import { useQuery } from "@tanstack/react-query";
import { fetchContentById, fetchParts } from "@/lib/api/client";

export function useParts() {
  return useQuery({
    queryKey: ["parts"],
    queryFn: fetchParts,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });
}

export function useContent(id: string) {
  return useQuery({
    queryKey: ["content", id],
    queryFn: () => fetchContentById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
}
