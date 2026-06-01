import Card from './Card'
import styled from '@emotion/styled'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchHouses } from '../api/houses'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

export default function ScrollingArea() {

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['houses'],
    queryFn: fetchHouses,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined
      return allPages.length + 1
    },
  })

  const houses = data?.pages.flat()

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
          <Card id={`house-card-${house.id}`} key={`house-card-${house.id}`} house={house} />
        )
      })}
      <button ref={ref}>{isFetchingNextPage ? 'Fetching...' : 'Load More'}</button>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`
