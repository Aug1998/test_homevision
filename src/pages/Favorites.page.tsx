import styled from '@emotion/styled'
import HouseCardsList from '../components/HouseCardsList'
import { housesQueries } from '../queries/house.queries'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useAppSelector } from '../store'

export default function Favorites() {
  const { data } = useInfiniteQuery(housesQueries.infinite())
  const houses = data?.pages.flat()
  const { favoritesIds } = useAppSelector((state) => state.favorites);

  const favoriteHouses = useMemo(
    () => {
      const favoritesIdsSet = new Set(favoritesIds);
      return houses?.filter(h => favoritesIdsSet.has(h.id))
    },
    [houses, favoritesIds]
  );

  return (
    <Main>
      <HouseCardsList houses={favoriteHouses || []} />
    </Main>
  )
}

const Main = styled.div`
  width: 100%;
  max-width: 82rem;
  margin-top: 1rem;
`