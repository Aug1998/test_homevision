import Card from './Card'
import styled from '@emotion/styled'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchHouses } from '../api/houses'

export default function ScrollingArea() {

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['houses'],
    queryFn: fetchHouses,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined
      return allPages.length + 1
    },
  })

  const houses = data?.pages.flat()

  return (
    <Container>
      {houses?.map((house) => {
        return (
          <Card id={`house-card-${house.id}`} key={`house-card-${house.id}`} house={house} />
        )
      })}
      <button onClick={() => fetchNextPage()}>Load More</button>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`
