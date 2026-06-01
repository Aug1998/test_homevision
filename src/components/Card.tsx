import styled from '@emotion/styled'
import type { House } from '../api'
import { Box } from '../styles'
import { IoLocationSharp, IoPersonSharp } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import theme from '../theme';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  house?: House
}

export default function Card({ house }: Props) {
  return (
    <Container id={`house-card-${house?.id}`} key={house?.id}>
      <img src={house?.photoURL} alt={house?.address} />
      <div>
        <p className='price'><FaDollarSign /> {house?.price?.toLocaleString()}</p>
        <h3 className='address'><IoLocationSharp />{house?.address}</h3>
        <p className='homeowner'><IoPersonSharp />{house?.homeowner}</p>
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

    
    .price {
      font-size: 1.5rem;
      font-weight: 700;
      color: ${theme.colors.primary};
      svg {
        color: ${theme.colors.primary};
        transform: scale(1.2) translateY(-1px);
      }
    }
    
    .address, .homeowner {
      display: flex;
      align-items: flex-start;
      gap: 0.4rem;
      font-size: 0.9rem;
      font-weight: 500;
      color: ${theme.colors.textBlack};
      svg {
        transform: scale(1.1) translateY(2px);
      }
    }
  }
`