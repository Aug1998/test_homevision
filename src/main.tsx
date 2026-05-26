import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Global } from '@emotion/react'
import { GlobalStyle } from './styles.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Global styles={GlobalStyle} />
    <App />
  </StrictMode>,
)
