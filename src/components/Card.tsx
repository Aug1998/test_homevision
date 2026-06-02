import styled from '@emotion/styled'
import type { House } from '../api'
import { Box } from '../styles'
import { IoLocationSharp, IoPersonSharp } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import theme from '../theme';
import { useFavoritesContext } from '../FavoritesContext'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  house?: House
  isFavorite?: boolean
}

export default function Card({ house, isFavorite }: Props) {
  const { toggleFavoriteHouseId } = useFavoritesContext();

  return (
    <Container id={`house-card-${house?.id}`} key={house?.id}>
      <img src={house?.photoURL} alt={house?.address} />
      <div>
        <p className='price'><FaDollarSign /> {house?.price?.toLocaleString()}</p>
        <h3 className='address'><IoLocationSharp />{house?.address}</h3>
        <p className='homeowner'><IoPersonSharp />{house?.homeowner}</p>
      </div>
      <FavoriteButton isFavorite={isFavorite} onClick={() => toggleFavoriteHouseId(house?.id)}>
        {isFavorite ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
      </FavoriteButton>
    </Container>
  )
}

const Container = styled(Box)`
  padding: unset;
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 7fr;
  grid-template-rows: auto;
  grid-template-areas:
    'image content'
  ;
  gap: 1.2rem;
  position: relative;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
    transition: all 0.2s;
  }

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
    justify-content: flex-start;
    padding: 1.5rem 0;
    gap: 0.1rem;
    
    .price {
      font-size: 1.75rem;
      font-weight: 700;
      color: ${theme.colors.primary};
      margin-bottom: 0.1rem;
      svg {
        color: ${theme.colors.primary};
        transform: scale(1.4) translateY(-2px);
        margin-right: -0.2rem;
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
        transform: scale(1.1) translateY(3px);
      }
    }
  }
`

const FavoriteButton = styled.button<{ isFavorite?: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0 1rem 0 1rem;
  border: 1px solid ${theme.colors.grey};
  border-top: none;
  border-right: none;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  padding: 2px 0 0 1px;

  svg {
    color: ${props => props.isFavorite ? theme.colors.red : theme.colors.grey};
    font-size: 1.5rem;
    transition: all 0.2s;
  }
  &:hover {
    svg {
      color: ${theme.colors.red};
      opacity: ${props => props.isFavorite ? "0.6" : "1"};
    }
  }
` 