import NavBar from "./components/Navbar"
import Footer from "./components/Footer"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"


function App() {

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Home />}>
        </Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
