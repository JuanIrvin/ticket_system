import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import EventosPage from "./pages/EventosPage";
import EventoForm from "./pages/EventosForm";
import NewEventoForm from "./pages/NewEventoForm";
import NotFound from "./pages/NotFound";
import { EventoContextProvider } from "./context/EventoProvider";

import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <div className="min-h-screen">
//       <Navbar />
//       <div className="container mx-auto py-4 px-20">
//         <EventoContextProvider>
//           <Routes>
//             <Route path="/" element={<EventosPage />} />
//             <Route path="/new" element={<NewEventoForm />} />
//             <Route path="/edit/:id" element={<EventoForm />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </EventoContextProvider>
//       </div>
//     </div>
//   );
// }


// function App() {
//   return (
//     <div className="min-h-screen bg-zinc-900">
//       {/* Aquí aseguramos que el Navbar ocupe la pantalla */}
//       <Navbar />
      
//       {/* Contenido principal que se mueve a la derecha cuando el Navbar se abre */}
//       <div 
//         className="transition-all duration-300 ease-in-out" 
//         style={{ marginLeft: '0px' }} // Esto se actualizará dinámicamente
//       >
//         <div className="container mx-auto py-4 px-20">
//           <EventoContextProvider>
//             <Routes>
//               <Route path="/" element={<EventosPage />} />
//               <Route path="/new" element={<NewEventoForm />} />
//               <Route path="/edit/:id" element={<EventoForm />} />
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </EventoContextProvider>
//         </div>
//       </div>
//     </div>
//   );
// }

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  // 🔹 Detectar Swipe para cerrar el menú
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      touchEndX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (touchStartX - touchEndX > 50) setIsOpen(false); // Deslizar a la izquierda cierra el menú
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-zinc-900 overflow-hidden transition-all duration-300">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* 🔹 Mueve el contenido cuando el menú está abierto */}
      <div className={`flex-1 transition-all duration-300`}>
        <div className="container mx-auto py-4 px-5">
          <EventoContextProvider>
            <Routes>
              <Route path="/" element={<EventosPage />} />
              <Route path="/new" element={<NewEventoForm />} />
              <Route path="/edit/:id" element={<EventoForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </EventoContextProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
