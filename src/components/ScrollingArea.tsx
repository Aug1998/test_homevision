import Card from './Card'
import styled from '@emotion/styled'
import mockData from '../assets/mockData.json'

export default function ScrollingArea() {
  const houses = mockData.houses

  return (
    <Container>
       {houses.map((house) => (
        <Card key={house.id} house={house} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`
