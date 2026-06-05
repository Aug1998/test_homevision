import styled from '@emotion/styled'
import React from 'react'
import theme from '../theme'
import { css } from '@emotion/react'
import { Link } from 'react-router'

type Props = React.ComponentProps<typeof Link> & {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export default function Button({ to, target, children, variant = 'primary' }: Props) {
  return (
    <Container to={to} target={target} variant={variant}>
      {children}
    </Container >
  )
}

const Container = styled(Link)<{ variant: 'primary' | 'secondary' }>`
  cursor: pointer;
  border-radius: 8px;
  height: auto;
  padding: .5rem 1rem;
  font-size: .875rem;
  font-weight: 500;
  line-height: 1.5;
  transition: border-color .3s ease-in-out, background-color .3s ease-in-out;
  box-shadow: 0 1px 2px #0000000f, 0 1px 3px #0000001a;
  ${(props) => props.variant === 'primary' ? primaryStyle : secondaryStyle}
  `

const primaryStyle = css`
  color: ${theme.colors.white};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`

const secondaryStyle = css`
  color: ${theme.colors.textBlack};
  background-color: 'transparent';
  border: 1px solid ${theme.colors.grey};
  &:hover {
    background-color: ${theme.colors.grey};
    border-color: ${theme.colors.primary};
  }
`