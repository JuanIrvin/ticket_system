import { Route, Routes } from "react-router-dom";

import EventosPage from "./pages/EventosPage";
import EventoForm from "./pages/EventosForm";
import NotFound from "./pages/NotFound";
import { EventoContextProvider } from "./context/EventoProvider";

import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-zinc-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-4 px-20">
        <EventoContextProvider>
          <Routes>
            <Route path="/" element={<EventosPage />} />
            <Route path="/new" element={<EventoForm />} />
            <Route path="/edit/:id" element={<EventoForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </EventoContextProvider>
      </div>
    </div>
  );
}

export default App;
