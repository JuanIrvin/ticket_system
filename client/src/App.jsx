import { Route, Routes } from "react-router-dom"

import BitacoraEventoPage from "./pages/BitacoraEventoPage"
import BitacoraEventoForm from "./pages/BitacoraEventoForm"
import NotFound from "./pages/NotFound"

import NavBar from "./components/NavBar"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<BitacoraEventoPage />} />
        <Route path="/new" element={<BitacoraEventoForm />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
    
  )
}

export default App