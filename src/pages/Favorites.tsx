import styled from '@emotion/styled'
import Filters from '../components/Filters'
import ScrollingArea from '../components/ScrollingArea'

export default function Favorites() {
  return (
    <Main>
      <Filters />
      <ScrollingArea />
    </Main>
  )
}

const Main = styled.div`
  width: 100%;
  max-width: 82rem;
  display: grid;
  grid-template-columns: 1fr 3fr;
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