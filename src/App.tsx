import NavBar from "./components/NavBar"
import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

