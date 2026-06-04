import type { House } from "../api";
import { fetchHouses } from "../api/client";

export const housesQueries = {
  infinite: () => ({
    queryKey: ["houses"],
    queryFn: fetchHouses,
    initialPageParam: 1,
    getNextPageParam: (lastPage: House[], allPages: House[][]) => {
      if (lastPage.length === 0) return undefined
      return allPages.length + 1
    },
  }),
};