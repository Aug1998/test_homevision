import NavBar from "./components/NavBar"
import { BrowserRouter, Route, Routes } from "react-router"
import FavoritesPage from "./pages/Favorites.page"
import HomePage from "./pages/Home.page"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

