import React from 'react'
import styled from '@emotion/styled'
import theme from '../theme'
import Button from './Button'

export default function NavBar() {
  return (
    <Container>
      <Content>
        <a href="/">
          <Logo src="https://cdn.prod.website-files.com/683f6efa9ca6a7e1d412fdbc/683f70dc65eb1baa61d8c626_Logo.svg" />
        </a>
        <Nav>
          <NavLinks>
            <a href="/about">Platform</a>
            <a href="/contact">Contact</a>
          </NavLinks>
          <NavCTAs>
            <Button variant="secondary">Get Started</Button>
            <Button>Get Started</Button>
          </NavCTAs>
        </Nav>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 77px;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.grey};
  position: sticky;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
  max-width: 82rem;
  `

const Logo = styled.img`
  width: 120px;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  *{
    font-weight: 500;
  }
  `

const NavLinks = styled.div`
  display: flex;
  gap: 4px;
  a {
    padding: 0.5rem 1rem;
    color: ${theme.colors.textBlack};
    &:hover {
      color: ${theme.colors.primary};
    }
  }
`

const NavCTAs = styled.div`
  display: flex;
  gap: 1rem;
`