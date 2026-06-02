export const LOCAL_STORAGE_KEY = 'favoriteHousesIds'

export const getFavoriteHousesFromLocalStorage = (): number[] => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]')
}

export const setFavoriteHousesInLocalStorage = (ids: number[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids))
}