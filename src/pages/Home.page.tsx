import styled from '@emotion/styled'
import Filters from '../components/Filters'
import ScrollingArea from '../components/HouseCardsList'
import { useInfiniteQuery } from '@tanstack/react-query'
import { housesQueries } from '../queries/house.queries'

export default function Home() {
  const { data } = useInfiniteQuery(housesQueries.infinite())
  const houses = data?.pages.flat()

  return (
    <Main>
      <Filters />
      <ScrollingArea houses={houses || []} />
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