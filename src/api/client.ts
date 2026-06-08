import type { QueryFunctionContext } from "@tanstack/react-query";
import type { House } from "./type"

export const fetchHouses = async (
  { pageParam, queryKey }: QueryFunctionContext<readonly [string, { itemsPerPage?: number }], number>
): Promise<House[]> => {
  const housesApi = import.meta.env.VITE_HOUSES_API_URL;

  const response = await fetch(`${housesApi}?per_page=${queryKey[1].itemsPerPage}&page=${pageParam}`)
  if (!response.ok) {
    throw new Error('Failed to fetch houses')
  }
  return response.json().then((data) => data.houses)
}

export const fetchFixedAmountOfHouses = async (amount: number): Promise<House[]> => {
  const housesApi = import.meta.env.VITE_HOUSES_API_URL;
  const response = await fetch(`${housesApi}?per_page=${amount}&page=1`)
  if (!response.ok) {
    throw new Error('Failed to fetch houses')
  }
  return response.json().then((data) => data.houses)
}