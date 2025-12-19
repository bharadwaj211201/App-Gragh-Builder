import { useQuery } from "@tanstack/react-query";
import { fetchApps } from "../mocks/mockApi";

export type AppItem = {
  id: string;
  name: string;
};

export function useApps() {
  return useQuery<AppItem[]>({
    queryKey: ["apps"],
    queryFn: () => fetchApps(),
  });
}