import Card from './Card'
import styled from '@emotion/styled'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import LoadingIcon from './LoadingIcon'
import theme from '../theme'
import { useAppSelector } from '../store'
import { housesQueries } from '../queries/house.queries'
import type { House } from '../api'

interface Props {
  houses: House[]
}

export default function HouseCardsList({ houses }: Props) {
  const { favoritesIds } = useAppSelector((state) => state.favorites);
  const { fetchNextPage, isFetchingNextPage } = useInfiniteQuery(housesQueries.infinite())
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  return (
    <Container>
      {houses?.map((house) => {
        return (
          <Card
            id={`house-card-${house.id}`}
            key={`house-card-${house.id}`}
            house={house}
            isFavorite={favoritesIds.includes(house.id)}
          />
        )
      })}
      <Sentinel ref={ref}></Sentinel>
      <LoadingBar isVisible={isFetchingNextPage}>
        {isFetchingNextPage ? <LoadingIcon /> : ''}
      </LoadingBar>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  position: relative;
`

const LoadingBar = styled.div<{ isVisible: boolean }>`
  width: 100%;
  opacity: ${props => (props.isVisible ? 1 : 0)};
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