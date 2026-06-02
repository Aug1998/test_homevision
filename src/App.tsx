import NavBar from "./components/NavBar"
import { FavoritesProvider } from './FavoritesContext'
import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  )
}

export default App

