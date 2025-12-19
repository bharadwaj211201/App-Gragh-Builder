import { useQuery } from "@tanstack/react-query";
import { fetchAppGraph } from "../mocks/mockApi";

export function useAppGraph(appId: string | null) {
  return useQuery({
    queryKey: ["appgraph", appId],
    queryFn: () => fetchAppGraph(appId!),
    enabled: !!appId,
  });
}