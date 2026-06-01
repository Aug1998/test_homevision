import type { QueryFunctionContext } from "@tanstack/react-query";
import type { House } from "./type"

export const fetchHouses = async ({ pageParam }: QueryFunctionContext<string[], number>): Promise<House[]> => {
  const housesApi = import.meta.env.VITE_HOUSES_API_URL;
  const itemsPerPage = 10

  const response = await fetch(`${housesApi}?per_page=${itemsPerPage}&page=${pageParam}`)
  if (!response.ok) {
    throw new Error('Failed to fetch houses')
  }
  return response.json().then((data) => data.houses)
}