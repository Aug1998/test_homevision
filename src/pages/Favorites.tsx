import styled from '@emotion/styled'
import ScrollingArea from '../components/ScrollingArea'

export default function Favorites() {
  return (
    <Main>
      <ScrollingArea />
    </Main>
  )
}

const Main = styled.div`
  width: 100%;
  max-width: 82rem;
  margin-top: 1rem;
`