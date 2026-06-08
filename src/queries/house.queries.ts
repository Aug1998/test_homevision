import type { UseQueryOptions } from "@tanstack/react-query";
import type { House } from "../api";
import { fetchFixedAmountOfHouses, fetchHouses } from "../api/client";

export const housesQueries = {
  infinite: (itemsPerPage: number) => ({
    queryKey: ["houses", { itemsPerPage }] as const,
    queryFn: fetchHouses,
    initialPageParam: 1,
    getNextPageParam: (lastPage: House[], allPages: House[][]) => {
      if (lastPage.length === 0) return undefined
      return allPages.length + 1
    },
  }),
  amount: (
    itemsPerPage: number,
    options?: UseQueryOptions<House[], Error, House[], readonly ["houses", { itemsPerPage: number }]>
  ) => {
    return {
      ...options,
      queryKey: ["houses", { itemsPerPage }] as const,
      queryFn: () => fetchFixedAmountOfHouses(itemsPerPage),
    } as UseQueryOptions<House[], Error, House[], readonly ["houses", { itemsPerPage: number }]>
  }
};
