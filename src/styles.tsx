import styled from '@emotion/styled'
import { css } from '@emotion/react'
import theme from './theme'

export const GlobalStyle = css`
  html {
    --navbar-height: 4rem;
    font-size: 16px; 
  }
  *{
    margin: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    user-select: none;
    transition: color 0.3s ease-in-out;
  }
  body {
    background-color: ${theme.colors.primaryLight};
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    justify-content: flex-start;
    align-items: center;
  }
  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: scroll;
    padding-top: var(--navbar-height);
  }
  a {
    text-decoration: none;
  }
`

export const Title = styled.h1`
  grid-area: title;
  text-align: center;
  font-size: 1.4rem;
  line-height: 70px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`

export const Box = styled.div`
  color: ${theme.colors.black};
  font-family: Inter,sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  box-sizing: border-box;
  flex-flow: column;
  display: flex;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
  border: 1px solid ${theme.colors.grey};
  background-color: ${theme.colors.white};
  border-radius: 1rem;
  padding: 1.2rem;
`
