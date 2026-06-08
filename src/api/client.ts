import type { QueryFunctionContext } from "@tanstack/react-query";
import type { House } from "./type"

export const fetchHouses = async (
  { pageParam, queryKey }: QueryFunctionContext<readonly [string, { itemsPerPage?: number }], number>
): Promise<House[]> => {
  const housesApi = import.meta.env.VITE_HOUSES_API_URL;

  try {
    const response = await fetch(`${housesApi}?per_page=${queryKey[1].itemsPerPage}&page=${pageParam}`)
    
    if (!response.ok) {
      const statusMessage = getStatusMessage(response.status);
      const errorMessage = `Failed to fetch houses: ${statusMessage} (${response.status})`;
      throw new Error(errorMessage);
    }
    
    return response.json().then((data) => data.houses)
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error: Unable to reach the server. Please check your connection.', { cause: error });
    }
    throw error;
  }
}

export const fetchFixedAmountOfHouses = async (amount: number): Promise<House[]> => {
  const housesApi = import.meta.env.VITE_HOUSES_API_URL;
  
  try {
    const response = await fetch(`${housesApi}?per_page=${amount}&page=1`)
    
    if (!response.ok) {
      const statusMessage = getStatusMessage(response.status);
      const errorMessage = `Failed to fetch houses: ${statusMessage} (${response.status})`;
      throw new Error(errorMessage);
    }
    
    return response.json().then((data) => data.houses)
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error: Unable to reach the server. Please check your connection.', { cause: error });
    }
    throw error;
  }
}

function getStatusMessage(status: number): string {
  const statusMessages: Record<number, string> = {
    400: 'Bad Request - Invalid parameters',
    401: 'Unauthorized - Authentication required',
    403: 'Forbidden - Access denied',
    404: 'Not Found - Resource does not exist',
    429: 'Too Many Requests - Please try again later',
    500: 'Internal Server Error - Server error',
    502: 'Bad Gateway - Server temporarily unavailable',
    503: 'Service Unavailable - Server is currently unavailable, please try again later',
    504: 'Gateway Timeout - Server took too long to respond',
  };
  
  return statusMessages[status] || 'HTTP Error - Please try again';
}