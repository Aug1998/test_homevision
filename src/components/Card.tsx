import styled from '@emotion/styled'
import type { House } from '../api'
import { Box } from '../styles'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  house?: House
}

export default function Card({ house }: Props) {
  return (
    <Container id={`house-card-${house?.id}`} key={house?.id}>
      <img src={house?.photoURL} alt={house?.address} />
      <div>
        <p>$ {house?.price?.toLocaleString()}</p>
        <h3>{house?.address}</h3>
        <p>{house?.homeowner}</p>
      </div>
    </Container>
  )
}

const Container = styled(Box)`
  padding: unset;
  padding-right: 0.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto;
  grid-template-areas:
    'image content'
  ;
  gap: 0.5rem;

  img {
    width: 100%;
    height: 12rem;
    object-fit: cover;
    grid-area: image;
    border-radius: 1rem 0px 0px 1rem;
  }
  
  div {
    grid-area: content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.25rem;
  }
`