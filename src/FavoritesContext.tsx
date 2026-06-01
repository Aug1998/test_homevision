import React, { createContext, useEffect, useState, type ReactNode } from 'react'

const KEY = 'favoriteHousesIds'

type FavoritesContextValue = {
  favoritesIds: number[]
  toggleFavoriteHouseId: (id?: number) => void
  isFavoriteHouseId: (id?: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoritesIds, setFavoritesIds] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem(KEY) ?? '[]')
  )

  useEffect(() => {
    // keep localStorage in sync if empty on mount
    try {
      const stored = localStorage.getItem(KEY)
      if (!stored) localStorage.setItem(KEY, JSON.stringify(favoritesIds))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // ignore in SSR or restricted environments
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getFromLocalStorage = (): number[] => {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  }

  const setInLocalStorage = (ids: number[]) => {
    localStorage.setItem(KEY, JSON.stringify(ids))
  }

  const toggleFavoriteHouseId = (id: number | undefined) => {
    if (id === undefined) return

    const ids = getFromLocalStorage()

    if (ids.includes(id)) {
      const next = ids.filter((_id) => _id !== id)
      setInLocalStorage(next)
      setFavoritesIds(next)
    } else {
      const next = [...ids, id]
      setInLocalStorage(next)
      setFavoritesIds(next)
    }
  }

  const isFavoriteHouseId = (id: number | undefined): boolean => {
    if (id === undefined) return false
    return favoritesIds.includes(id)
  }

  return (
    <FavoritesContext.Provider value={{ favoritesIds, toggleFavoriteHouseId, isFavoriteHouseId }}>
      {children}
    </FavoritesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFavoritesContext = () => {
  const ctx = React.useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavoritesContext must be used within a FavoritesProvider')
  return ctx
}

export default FavoritesContext
