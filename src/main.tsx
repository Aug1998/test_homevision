import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Global } from '@emotion/react'
import { GlobalStyle } from './styles.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FavoritesProvider } from './FavoritesContext.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <Global styles={GlobalStyle} />
        <App />
      </FavoritesProvider>
    </QueryClientProvider>
  </StrictMode>,
)
