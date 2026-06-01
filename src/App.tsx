import styled from "@emotion/styled"
import NavBar from "./components/NavBar"
import Filters from "./components/Filters"
import ScrollingArea from "./components/ScrollingArea"
import { FavoritesProvider } from './FavoritesContext'

function App() {

  return (
    <FavoritesProvider>
      <NavBar />
      <Main>
        <Filters />
        <ScrollingArea />
      </Main>
    </FavoritesProvider>
  )
}

export default App

const Main = styled.div`
  width: 100%;
  max-width: 82rem;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-areas: "filters content";
  gap: 1rem;
  margin-top: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "filters"
      "content";
  }
`