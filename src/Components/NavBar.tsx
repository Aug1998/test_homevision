import React from 'react'
import styled from '@emotion/styled'

export default function NavBar() {
  return (
    <Container>HomeVision</Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 90px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #333;
  color: #fff;
`