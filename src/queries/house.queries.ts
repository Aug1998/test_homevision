import type { House } from "../api";
import { fetchHouses } from "../api/client";

export const housesQueries = {
  infinite: (itemsPerPage: number = 10) => ({
    queryKey: ["houses", { itemsPerPage }] as const,
    queryFn: fetchHouses,
    initialPageParam: 1,
    getNextPageParam: (lastPage: House[], allPages: House[][]) => {
      if (lastPage.length === 0) return undefined
      return allPages.length + 1
    },
  }),
  amount: (itemsPerPage: number = 50) => ({
    queryKey: ["houses", { itemsPerPage }] as const,
    queryFn: fetchHouses,
  }),
};