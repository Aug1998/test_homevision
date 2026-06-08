import styled from '@emotion/styled'
import Filters from '../components/Filters'
import { useInfiniteQuery } from '@tanstack/react-query'
import { housesQueries } from '../queries/house.queries'
import { useInView } from 'react-intersection-observer'
import { useAppSelector } from '../store'
import { useEffect, useMemo, useRef } from 'react'
import HouseCard from '../components/HouseCard'
import LoadingIcon from '../components/LoadingIcon'
import theme from '../theme'
import type { House } from '../api'
import { addressIsInSelectedStates, priceIsInRange, isPriceRangeValid } from '../store/slices/Filters/filters.util'
import { ErrorMessage } from '../styles'

export default function HomePage() {
  const { favoritesIds } = useAppSelector((state) => state.favorites);
  const { states, priceRange } = useAppSelector((state) => state.filters);
  const itemsPerPage = states.selectedStates.length > 0 ? 50 : 10
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    {
      ...housesQueries.infinite(itemsPerPage),
      enabled: isPriceRangeValid(priceRange),
    }
  )
  const { ref, inView } = useInView()
  const houses = data?.pages.flat()

  const filteredHouses = useMemo<House[]>(
    () => {
      return houses?.filter((house: House) => {
        return priceIsInRange(house.price, priceRange) && addressIsInSelectedStates(house.address, states.selectedStates)
      }) || []
    },
    [houses, priceRange, states]
  );

  const inViewRef = useRef(inView)
  const hasNextPageRef = useRef(hasNextPage)
  const isFetchingRef = useRef(isFetchingNextPage)

  useEffect(() => { inViewRef.current = inView }, [inView])
  useEffect(() => { hasNextPageRef.current = hasNextPage }, [hasNextPage])
  useEffect(() => { isFetchingRef.current = isFetchingNextPage }, [isFetchingNextPage])

  useEffect(() => {
    if (!inView || !isPriceRangeValid(priceRange) || !hasNextPage || isFetchingNextPage) return
    fetchNextPage()
  }, [inView, fetchNextPage, isFetchingNextPage, hasNextPage, priceRange, itemsPerPage])

  return (
    <Main>
      <Filters />
      <Container>
        {!isLoading ? filteredHouses?.map((house) => {
          return (
            <HouseCard
              id={`house-card-${house.id}`}
              key={`house-card-${house.id}`}
              house={house}
              isFavorite={favoritesIds.includes(house.id)}
            />
          )
        }) : <LoadingIcon text='Searching for your ideal home' />}
        {!isPriceRangeValid(priceRange) &&
          <ErrorMessage>Please check your filters and try again.</ErrorMessage>
        }
        {isFetchingNextPage && (
          <LoadingBar>
            <LoadingIcon text='Searching for your ideal home' />
          </LoadingBar>
        )}
        <Sentinel ref={ref} />
      </Container>
    </Main>
  )
}

const Main = styled.div`
  width: 100%;
  max-width: 82rem;
  display: grid;
  grid-template-columns: 2fr 5fr;
  grid-template-areas: "filters content";
  gap: 1rem;
  margin-top: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "filters"
      "content";
  }
`

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  position: relative;
`

const LoadingBar = styled.div`
  width: 100%;
  transition: opacity 0.2s ease-in-out;
  height: 6rem;
  background-color: #ccc;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: linear-gradient(0deg,${theme.colors.primaryLight} 0%, transparent 100%);
  height: 6rem;
  pointer-events: none;
  backdrop-filter: blur(12px);
  mask-image: linear-gradient(to top, black 0%, black 20%, transparent 100%);
`

const Sentinel = styled.div`
  width: 100%;
  height: 1px;
`