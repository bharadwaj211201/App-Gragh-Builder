import { useQuery } from "@tanstack/react-query";
import { fetchApps } from "../mocks/mockApi";

export function useApps() {
  return useQuery({
    queryKey: ["apps"],
    queryFn: fetchApps,
  });
}