import styled from '@emotion/styled'
import theme from '../theme'
import Button from './Button'
import { Link, useLocation } from "react-router"
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function NavBar() {
  const { pathname } = useLocation()

  return (
    <Container>
      <Content>
        <Link to="/">
          <Logo src="https://cdn.prod.website-files.com/683f6efa9ca6a7e1d412fdbc/683f70dc65eb1baa61d8c626_Logo.svg" />
        </Link>
        <Nav>
          <NavLinks>
            <StyledLink isActive={pathname === "/"} to="/">Home</StyledLink>
            <StyledLink isActive={pathname === "/favorites"} to="/favorites">Favorites</StyledLink>
          </NavLinks>
          <NavCTAs>
            <Button to="https://github.com/Aug1998/test_homevision" target="_blank" variant="secondary">
              <FaGithub />
              Github
            </Button>
            <Button to="https://www.linkedin.com/in/augusto-pruvost/"  target="_blank">
              <FaLinkedin />
              Get in touch
            </Button>
          </NavCTAs>
        </Nav>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.grey};
  position: sticky;
  top: 0;
  z-index: 100;
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
  transition: all 0.2s ease-in-out;
  &:hover {
    opacity: 0.7;
  }
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
`

const NavCTAs = styled.div`
  display: flex;
  gap: 1rem;
`

const StyledLink = styled(Link) <{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  color: ${props => props.isActive ? theme.colors.primary : theme.colors.textBlack};
  &:hover {
    color: ${theme.colors.primary};
  }
`