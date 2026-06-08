import styled from '@emotion/styled'
import { housesQueries } from '../queries/house.queries'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useAppSelector } from '../store'
import type { House } from '../api'
import Card from '../components/Card'
import LoadingIcon from '../components/LoadingIcon'

export default function FavoritesPage() {
  const { favoritesIds } = useAppSelector((state) => state.favorites);
  const maxFavoriteId = Math.max(...favoritesIds) + 1;
  const { data, isLoading } = useQuery<House[]>(housesQueries.amount(maxFavoriteId))

  const favoriteHouses = useMemo(
    () => {
      const favoritesIdsSet = new Set(favoritesIds);
      return data?.filter((house: House) => favoritesIdsSet.has(house.id)) || []
    },
    [data, favoritesIds]
  );

  return (
    <>
      {!isLoading ?
        <Container>
          {favoriteHouses?.map((house: House) => {
            return (
              <Card
                id={`house-card-${house.id}`}
                key={`house-card-${house.id}`}
                house={house}
                isFavorite={favoritesIds.includes(house.id)}
              />
            )
          })}
        </Container> : <LoadingIcon text='Loading your ideal homes' />
      }
    </>
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 82rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
`
