import type { QueryFunctionContext } from "@tanstack/react-query";
import type { House } from "./type"

export const fetchHouses = async (
  { pageParam, queryKey }: QueryFunctionContext<readonly [string, { itemsPerPage?: number }], number>
): Promise<House[]> => {
  const housesApi = import.meta.env.VITE_HOUSES_API_URL;
  const defaultItemsPerPage = 10
  
  const itemsPerPage = (queryKey && queryKey[1] && typeof queryKey[1].itemsPerPage === 'number')
    ? queryKey[1].itemsPerPage
    : defaultItemsPerPage

  const response = await fetch(`${housesApi}?per_page=${itemsPerPage}&page=${pageParam}`)
  if (!response.ok) {
    throw new Error('Failed to fetch houses')
  }
  return response.json().then((data) => data.houses)
}