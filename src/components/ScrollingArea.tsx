import Card from './Card'
import styled from '@emotion/styled'

export default function ScrollingArea() {
  return (
    <Container>
      <Card />
      <Card />
      <Card />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`
