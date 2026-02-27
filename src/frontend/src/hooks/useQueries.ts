import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type { HistoryEntry } from "../backend.d";

export type { HistoryEntry };

export function useUsageStats() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[string, bigint]>>({
    queryKey: ["usageStats"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getUsageStats();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useRecentHistory(toolType: string) {
  const { actor, isFetching } = useActor();
  return useQuery<HistoryEntry[]>({
    queryKey: ["toolHistory", toolType],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getRecentToolHistory(toolType);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 10_000,
  });
}

export function useAllHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<HistoryEntry[]>({
    queryKey: ["allHistory"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllRecentHistory();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 10_000,
  });
}

export function useSaveHistory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      toolType,
      input,
      output,
    }: {
      toolType: string;
      input: string;
      output: string;
    }) => {
      if (!actor) return;
      await actor.saveHistory(toolType, input, output);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["toolHistory", variables.toolType] });
      queryClient.invalidateQueries({ queryKey: ["usageStats"] });
      queryClient.invalidateQueries({ queryKey: ["allHistory"] });
    },
    onError: () => {
      // Silently fail — don't block UX
    },
  });
}
