import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import RotaProtegida from "./components/RotaProtegida"

function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/home" element={
              <RotaProtegida>
                  <HomePage />
              </RotaProtegida>
            }/>
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    </>
  )
}

export default App
