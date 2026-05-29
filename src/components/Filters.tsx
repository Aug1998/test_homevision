import styled from '@emotion/styled'
import { Box } from '../styles'

export default function Filters() {
  return (
    <Container>Filters</Container>
  )
}

const Container = styled(Box)`
  max-height: 88vh;
  position: sticky;
  top: calc(72px + 1rem);
  z-index: 100;
`